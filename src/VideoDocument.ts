import * as vscode from 'vscode';

export default class VideoDocument extends vscode.Disposable implements vscode.CustomDocument {
	public disposed = false;
	
	public dispose(): void {
		this.disposed = true;
	}

	constructor(public readonly uri: vscode.Uri) {
		super(() => this.disposed = true);
	}
}
