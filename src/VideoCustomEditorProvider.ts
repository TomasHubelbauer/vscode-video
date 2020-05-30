import * as vscode from 'vscode';
import VideoDocument from './VideoDocument';
import { open } from 'fs';

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
    
	async openCustomDocument(uri: vscode.Uri, openContext: vscode.CustomDocumentOpenContext, _token: vscode.CancellationToken) {
        const initialContent = await vscode.workspace.fs.readFile(uri);
		return new VideoDocument(uri, initialContent, { getFileData: async () => initialContent });
    }
    
	resolveCustomEditor(document: VideoDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken) {
        // TODO: Find a way to use `document.uri`
        // https://github.com/microsoft/vscode-extension-samples/blob/master/custom-editor-sample/src/pawDrawEditor.ts#L259
        webviewPanel.webview.html = `<video src="${document.uri.fsPath}">${document.uri.fsPath}</video><p>${document.uri.fsPath}</p>`;
	}
}
