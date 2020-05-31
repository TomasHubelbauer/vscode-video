import * as vscode from 'vscode';
import VideoDocument from './VideoDocument';

export default class VideoCustomEditorProvider implements vscode.CustomEditorProvider<VideoDocument> {
	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		return vscode.window.registerCustomEditorProvider2(
			VideoCustomEditorProvider.viewType,
			new VideoCustomEditorProvider(context),
			{
				supportsMultipleEditorsPerDocument: false,
				webviewOptions: {

				}
			});
	}

	private static readonly viewType = 'vscode-video';

	constructor(private readonly _context: vscode.ExtensionContext) {

	}

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

	resolveCustomEditor(document: VideoDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken) {
		const webviewUri = webviewPanel.webview.asWebviewUri(document.uri);
		webviewPanel.webview.html = `<video src="${webviewUri}" title="${webviewUri}"></video>`;
	}
}
