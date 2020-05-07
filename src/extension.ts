import { CancellationToken, CustomDocument, CustomDocumentBackup, CustomDocumentBackupContext, CustomDocumentEditEvent, CustomDocumentOpenContext, CustomEditorProvider, Disposable, EventEmitter, ExtensionContext, Uri, WebviewPanel, window } from 'vscode';

export function activate(context: ExtensionContext) {
	context.subscriptions.push(VideoCustomEditorProvider.register(context));
}

// this method is called when your extension is deactivated
export function deactivate() { }

class VideoCustomEditorProvider implements CustomEditorProvider<VideoDocument> {
	public static register(context: ExtensionContext): Disposable {
		return window.registerCustomEditorProvider2(
			VideoCustomEditorProvider.viewType,
			new VideoCustomEditorProvider(context),
			{
				supportsMultipleEditorsPerDocument: false,
			});
	}

	private static readonly viewType = 'vscode-video';

	constructor(private readonly _context: ExtensionContext) {
	}

	private readonly _onDidChangeCustomDocument = new EventEmitter<CustomDocumentEditEvent<VideoDocument>>();
	public readonly onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;

	saveCustomDocument(document: VideoDocument, cancellation: CancellationToken): Thenable<void> {
		throw new Error("Method not implemented.");
	}
	saveCustomDocumentAs(document: VideoDocument, destination: Uri, cancellation: CancellationToken): Thenable<void> {
		throw new Error("Method not implemented.");
	}
	revertCustomDocument(document: VideoDocument, cancellation: CancellationToken): Thenable<void> {
		throw new Error("Method not implemented.");
	}
	backupCustomDocument(document: VideoDocument, context: CustomDocumentBackupContext, cancellation: CancellationToken): Thenable<CustomDocumentBackup> {
		throw new Error("Method not implemented.");
	}
	openCustomDocument(uri: Uri, openContext: CustomDocumentOpenContext, token: CancellationToken): VideoDocument | Thenable<VideoDocument> {
		throw new Error("Method not implemented.");
	}
	resolveCustomEditor(document: VideoDocument, webviewPanel: WebviewPanel, token: CancellationToken): void | Thenable<void> {
		throw new Error("Method not implemented.");
	}
}

interface VideoDocumentDelegate {
	getFileData(): Promise<Uint8Array>;
}

class VideoDocument extends Disposable implements CustomDocument {
	public readonly uri: Uri;
	dispose(): void {
		throw new Error("Method not implemented.");
	}

	private constructor(uri: Uri, initialContent: Uint8Array, delegate: VideoDocumentDelegate) {
		super(() => { });
		this.uri = uri;
		//this._documentData = initialContent;
		//this._delegate = delegate;
	}
}
