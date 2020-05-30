import * as vscode from 'vscode';
import VideoCustomEditorProvider from './VideoCustomEditorProvider';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(VideoCustomEditorProvider.register(context));
}

export function deactivate() { }
