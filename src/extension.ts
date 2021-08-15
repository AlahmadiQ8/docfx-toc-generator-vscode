import * as vscode from 'vscode';
import { DocParser } from './docParser';
import { DocFxItem } from './docfx-item';
import { docFxItemsListFactory } from './docfx-items-list';
import { SortingTypeOptions } from './configurations';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('docfx-toc-generator.generateYamlToc', async (folder: vscode.Uri) => {

		if (folder instanceof vscode.Uri === false) {
			vscode.window.showErrorMessage("Invalid command execution context");
		}

		const files = await vscode.workspace.findFiles(new vscode.RelativePattern(folder, "*.md"));

		if (files.length === 0) {
			vscode.window.showWarningMessage(`No files found under ${folder.fsPath}`);
		}

		const docFxItems = docFxItemsListFactory(SortingTypeOptions.fileName);

		for (const file of files) {
			const doc = await vscode.workspace.openTextDocument(file);
			const titleParser = new DocParser(doc);
			let title = titleParser.extractTitle();
			if (!title) {
				vscode.window.showWarningMessage(`No title found in ${file.fsPath}`);
				title = "INSERT_NAME";
			}
			docFxItems.add(new DocFxItem(title, file));
		}

		const content = docFxItems.toString();

		vscode.workspace.openTextDocument({ language: 'yaml', content }).then(d => vscode.window.showTextDocument(d));

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
