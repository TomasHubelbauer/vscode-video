import * as vscode from 'vscode';

export default class VideoDocument extends vscode.Disposable implements vscode.CustomDocument {
	dispose(): void {
		throw new Error("Method not implemented.");
	}

	constructor(public readonly uri: vscode.Uri) {
		super(() => { });
	}
}
