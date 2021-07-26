// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { TitleParser } from './titleParser';
import { DocFxItem } from './docfx-item';

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

		// TODO: Make separate class instead of array to implement different sorting techniques
		const docFxItems: Array<DocFxItem> = [];

		for (const file of files) {
			const doc = await vscode.workspace.openTextDocument(file);
			const titleParser = new TitleParser(doc);
			let title = titleParser.extractTitle();
			if (!title) {
				vscode.window.showWarningMessage(`No title found in ${file.fsPath}`);
				title = "INSERT NAME";
			}
			docFxItems.push(new DocFxItem(title, file));
		}
		console.log("done reading files");

		// TODO: See todo comment above
		const content = docFxItems.sort((a, b) => b.uri.path.localeCompare(a.uri.path)).map(item => item.toString()).join('\n');

		vscode.workspace.openTextDocument({ language: 'yaml', content }).then(d => vscode.window.showTextDocument(d));

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
