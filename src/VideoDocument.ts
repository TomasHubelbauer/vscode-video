import * as vscode from 'vscode';

export default class VideoDocument extends vscode.Disposable implements vscode.CustomDocument {
	public readonly uri: vscode.Uri;
	dispose(): void {
		throw new Error("Method not implemented.");
	}

	constructor(uri: vscode.Uri, initialContent: Uint8Array, delegate: VideoDocumentDelegate) {
		super(() => { });
		this.uri = uri;
		//this._documentData = initialContent;
		//this._delegate = delegate;
	}
}
