// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('doxfx-toc-generator.generateYamlToc', async (folder: vscode.Uri) => {

		if (folder instanceof vscode.Uri === false) {
			vscode.window.showErrorMessage("Invalid command execution context");
		}

		// console.log(folder.fsPath);
		const files = await vscode.workspace.findFiles(new vscode.RelativePattern(folder, "*.md"));

		if (files.length === 0) {
			vscode.window.showWarningMessage(`No files found under ${folder.fsPath}`);
		}

		for (const file of files) {
			const t = await vscode.workspace.openTextDocument(file);
			// vscode.workspace.openTextDocument(file).then(doc => {
			// 	// vscode.window.showTextDocument(doc, { preview: false });
			// 	console.log(doc.getText().length);
			// });
			console.log(t.getText().length);
		}
		console.log("done reading files");

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
