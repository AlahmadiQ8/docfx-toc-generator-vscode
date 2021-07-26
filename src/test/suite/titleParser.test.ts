import * as assert from 'assert';
import { TextDocument, TextLine } from "vscode";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { TitleParser } from '../../titleParser';
// import * as myExtension from '../../extension';

const validMetadata1 = `---
title: This is a title
other: blah
---
`;
const validMetadata2 = `---
other: blah
other: blah1
other: blah2
title: This is a title
---
`;

const validMetadata3 = `---
other: blah
other: blah1

title: This is a title

---
`;

const invalidMetadata1 = `
---
title: This is a title
other: blah
---
`;

const invalidMetadata2 = `
title: This is a title
other: blah
---
`;

const invalidMetadata3 = `
---
titl: This is a title
other: blah
---
`;

const invalidMetadata4 = `
---
title:This is a title
other: blah
---
`;

const validMarkdown1 = `---
other: blah
---
# This is a title
`;

const validMarkdown2 = `---
other: blah
---
This is a title
===
`;

const validMarkdown3 = `---
other: blah
---
blah blah
# This is a title
`;

const validMarkdown4 = `---
other: blah
---
blah blah
  # This is a title
`;

const validMarkdown5 = `# This is a title
blah
`;

const invalidMarkdown1 = `---
other: blah
---
    # This is a title
`;


suite('TitleParser', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('.extractTitle() from validMetadata1', async () => {
        vscode.commands.executeCommand("workbench.action.closeAllEditors");
        const doc = await vscode.workspace.openTextDocument({ content: validMetadata1 });
        const titleParser = new TitleParser(doc);
		assert.strictEqual(titleParser.extractTitle(), "This is a title");
	});

	test('.extractTitle() from validMetadata2', async () => {
        vscode.commands.executeCommand("workbench.action.closeAllEditors");
        const doc = await vscode.workspace.openTextDocument({ content: validMetadata2 });
        const titleParser = new TitleParser(doc);
		assert.strictEqual(titleParser.extractTitle(), "This is a title");
	});

	test('.extractTitle() from validMetadata3', async () => {
        vscode.commands.executeCommand("workbench.action.closeAllEditors");
        const doc = await vscode.workspace.openTextDocument({ content: validMetadata3 });
        const titleParser = new TitleParser(doc);
		assert.strictEqual(titleParser.extractTitle(), "This is a title");
	});

    test('.extractTitle() from invalidMetadata1', async () => {
        vscode.commands.executeCommand("workbench.action.closeAllEditors");
        const doc = await vscode.workspace.openTextDocument({ content: invalidMetadata1 });
        const titleParser = new TitleParser(doc);
		assert.strictEqual(titleParser.extractTitle(), undefined);
	});

    test('.extractTitle() from invalidMetadata2', async () => {
        vscode.commands.executeCommand("workbench.action.closeAllEditors");
        const doc = await vscode.workspace.openTextDocument({ content: invalidMetadata2 });
        const titleParser = new TitleParser(doc);
		assert.strictEqual(titleParser.extractTitle(), undefined);
	});

    test('.extractTitle() from invalidMetadata3', async () => {
        vscode.commands.executeCommand("workbench.action.closeAllEditors");
        const doc = await vscode.workspace.openTextDocument({ content: invalidMetadata3 });
        const titleParser = new TitleParser(doc);
		assert.strictEqual(titleParser.extractTitle(), undefined);
	});

    test('.extractTitle() from invalidMetadata4', async () => {
        vscode.commands.executeCommand("workbench.action.closeAllEditors");
        const doc = await vscode.workspace.openTextDocument({ content: invalidMetadata4 });
        const titleParser = new TitleParser(doc);
		assert.strictEqual(titleParser.extractTitle(), undefined);
	});

    test('.extractTitle() from validMarkdown1', async () => {
        vscode.commands.executeCommand("workbench.action.closeAllEditors");
        const doc = await vscode.workspace.openTextDocument({ content: validMarkdown1 });
        const titleParser = new TitleParser(doc);
		assert.strictEqual(titleParser.extractTitle(), "This is a title");
	});

    test('.extractTitle() from validMarkdown2', async () => {
        vscode.commands.executeCommand("workbench.action.closeAllEditors");
        const doc = await vscode.workspace.openTextDocument({ content: validMarkdown2 });
        const titleParser = new TitleParser(doc);
		assert.strictEqual(titleParser.extractTitle(), "This is a title");
	});

    test('.extractTitle() from validMarkdown3', async () => {
        vscode.commands.executeCommand("workbench.action.closeAllEditors");
        const doc = await vscode.workspace.openTextDocument({ content: validMarkdown3 });
        const titleParser = new TitleParser(doc);
		assert.strictEqual(titleParser.extractTitle(), "This is a title");
	});

    test('.extractTitle() from validMarkdown4', async () => {
        vscode.commands.executeCommand("workbench.action.closeAllEditors");
        const doc = await vscode.workspace.openTextDocument({ content: validMarkdown4 });
        const titleParser = new TitleParser(doc);
		assert.strictEqual(titleParser.extractTitle(), "This is a title");
	});

    test('.extractTitle() from validMarkdown5', async () => {
        vscode.commands.executeCommand("workbench.action.closeAllEditors");
        const doc = await vscode.workspace.openTextDocument({ content: validMarkdown5 });
        const titleParser = new TitleParser(doc);
		assert.strictEqual(titleParser.extractTitle(), "This is a title");
	});

    test('.extractTitle() from invalidMarkdown1', async () => {
        vscode.commands.executeCommand("workbench.action.closeAllEditors");
        const doc = await vscode.workspace.openTextDocument({ content: invalidMarkdown1 });
        const titleParser = new TitleParser(doc);
		assert.strictEqual(titleParser.extractTitle(), undefined);
	});
});
