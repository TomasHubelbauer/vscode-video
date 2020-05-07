"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function activate(context) {
    context.subscriptions.push(VideoCustomEditorProvider.register(context));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
class VideoCustomEditorProvider {
    constructor(_context) {
        this._context = _context;
        this._onDidChangeCustomDocument = new vscode_1.EventEmitter();
        this.onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;
    }
    static register(context) {
        return vscode_1.window.registerCustomEditorProvider2(VideoCustomEditorProvider.viewType, new VideoCustomEditorProvider(context), {
            supportsMultipleEditorsPerDocument: false,
        });
    }
    saveCustomDocument(document, cancellation) {
        throw new Error("Method not implemented.");
    }
    saveCustomDocumentAs(document, destination, cancellation) {
        throw new Error("Method not implemented.");
    }
    revertCustomDocument(document, cancellation) {
        throw new Error("Method not implemented.");
    }
    backupCustomDocument(document, context, cancellation) {
        throw new Error("Method not implemented.");
    }
    openCustomDocument(uri, openContext, token) {
        throw new Error("Method not implemented.");
    }
    resolveCustomEditor(document, webviewPanel, token) {
        throw new Error("Method not implemented.");
    }
}
VideoCustomEditorProvider.viewType = 'vscode-video';
class VideoDocument extends vscode_1.Disposable {
    constructor(uri, initialContent, delegate) {
        super(() => { });
        this.uri = uri;
        //this._documentData = initialContent;
        //this._delegate = delegate;
    }
    dispose() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=extension.js.map