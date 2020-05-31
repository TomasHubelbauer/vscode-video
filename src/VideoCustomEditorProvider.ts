import * as vscode from 'vscode';
import VideoDocument from './VideoDocument';
import * as puppeteer from 'puppeteer-core';
import * as chromePaths from 'chrome-paths';

export default class VideoCustomEditorProvider implements vscode.CustomEditorProvider<VideoDocument> {
	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		return vscode.window.registerCustomEditorProvider2(VideoCustomEditorProvider.viewType, new VideoCustomEditorProvider(context));
	}

	private static readonly viewType = 'vscode-video';

	constructor(private readonly context: vscode.ExtensionContext) { }

	private readonly _onDidChangeCustomDocument = new vscode.EventEmitter<vscode.CustomDocumentEditEvent<VideoDocument>>();
	public readonly onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;

	saveCustomDocument(document: VideoDocument, cancellation: vscode.CancellationToken): Thenable<void> {
		throw new Error("Method saveCustomDocument not implemented.");
	}

	saveCustomDocumentAs(document: VideoDocument, destination: vscode.Uri, cancellation: vscode.CancellationToken): Thenable<void> {
		throw new Error("Method saveCustomDocumentAs not implemented.");
	}

	revertCustomDocument(document: VideoDocument, cancellation: vscode.CancellationToken): Thenable<void> {
		throw new Error("Method revertCustomDocument not implemented.");
	}

	backupCustomDocument(document: VideoDocument, context: vscode.CustomDocumentBackupContext, cancellation: vscode.CancellationToken): Thenable<vscode.CustomDocumentBackup> {
		throw new Error("Method backupCustomDocument not implemented.");
	}

	openCustomDocument(uri: vscode.Uri, openContext: vscode.CustomDocumentOpenContext, _token: vscode.CancellationToken) {
		return new VideoDocument(uri);
	}

	async resolveCustomEditor(document: VideoDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken) {
		const webviewUri = webviewPanel.webview.asWebviewUri(document.uri);
		webviewPanel.webview.options = { enableScripts: true };
		webviewPanel.webview.html = [
			// TODO: Add playback controls and turn the progress into a scrubbar
			`<img />`,
			'<br />',
			'<span id="timeSpan"></span>',
			'<progress></progress>',
			'<span id="durationSpan"></span>',

			// TODO: Pull the JS out of the extension bundle as show in the custom editor example on GitHub
			'<script>',
			`window.addEventListener('message', event => {`,
			`  document.querySelector('img').src = event.data.dataUri;`,
			`  document.querySelector('#timeSpan').textContent = event.data.time;`,
			`  document.querySelector('progress').value = event.data.time;`,
			`  document.querySelector('progress').max = event.data.duration;`,
			`  document.querySelector('#durationSpan').textContent = event.data.duration;`,
			'});', 
			'</script>',
		].join('');

		this.stream(document, (dataUri, time, duration) => webviewPanel.webview.postMessage({ dataUri, time, duration }));

		// Kill the browser when the custom editor is closed
		webviewPanel.onDidDispose(() => document.disposed = true);
	}

	async stream(document: VideoDocument, onFrame: (dataUri: string, time: number, duration: number) => void) {
		const executablePath = chromePaths.chrome;
		const browser = await puppeteer.launch({ executablePath });
		try {
			const [page] = await browser.pages();

		await page.goto(document.uri.fsPath);
		await page.waitForFunction(() => (document as any).querySelector('video').readyState === 4);

		// TODO: Find out why this does not have the video native dimensions
		const clip = await page.evaluate(() => {
			const video = (document as any).querySelector('video');
			video.controls = false;
			video.width = video.videoWidth;
			video.height = video.videoHeight;
			return video.getBoundingClientRect().toJSON();
		});

		do {
			// TODO: Consider using the screencast API instead of the screenshot API
			const dataUri = 'data:image/png;base64,' + await page.screenshot({ encoding: 'base64', clip });
			const { time, duration } = await page.evaluate(() => {
				const video = (document as any).querySelector('video');
				return { time: video.currentTime, duration: video.duration };
			});

			await onFrame(dataUri, time, duration);
			await new Promise(resolve => setTimeout(resolve, 0));
		}
		while (!document.disposed);
		}
		finally {
			await browser.close();
		}
	}
}
