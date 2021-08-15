import { TextDocument, TextLine } from "vscode";

/**
 * '# title'
 * '   # title'
 */
const regexForHashtagTitle = /^ {0,3}# (.*)/;

/**
 * '==='
 * '========='
 * '===        '
 */
const regexForTripleEqualTitle = /^===+\s*$/;

/**
 * Utility class to parse the title from a markdown document
 */
export class DocParser {
    private readonly doc: TextDocument;
    private hasFrontMatter = false;

    constructor(doc: TextDocument) {
        this.doc = doc;
        this.hasFrontMatter =this.doc.lineAt(0).text.startsWith('---');
    }

    public extractTitle(): string | undefined {
        const currentLine = 0;

        // TODO: code smell, use class for result rather than returning different types
        let titleorCurrentLineOrUndefined = this.extractItemFromMetadata('title', currentLine);

        switch (typeof titleorCurrentLineOrUndefined) {
            case 'string':
                return titleorCurrentLineOrUndefined;
            case 'number':
                const title = this.extractTitleFromMarkdown(titleorCurrentLineOrUndefined);
                if (title) { return title; }
            default:
                return undefined;
        }
    }

    public extractItemFromMetadata(item: string, currentLine: number): string | number | undefined {
        if (!this.hasFrontMatter) { return currentLine; }

        currentLine++;
        if (currentLine >= this.doc.lineCount) { return undefined; }

        let line = this.doc.lineAt(currentLine);
        while (!line.text.startsWith('---') && !line.text.startsWith(`${item}: `)) {
            currentLine++;
            if (currentLine >=  this.doc.lineCount) { return undefined; }
            line = this.doc.lineAt(currentLine);
        }

        if (line.text.startsWith(`${item}: `)) {
            const title = line.text.substring(7);
            return title;
        }

        return currentLine;
    }

    private extractTitleFromMarkdown(currentLine: number): string | undefined {
        if (currentLine >= this.doc.lineCount) { return undefined; }

        let line = this.doc.lineAt(currentLine);
        let regexResultForHashtagTitle = regexForHashtagTitle.exec(line.text);
        let regexResultForTripleEqualTitle= regexForTripleEqualTitle.test(line.text);
        while (!regexResultForHashtagTitle && !regexResultForTripleEqualTitle) {
            currentLine++;
            if (currentLine >=  this.doc.lineCount) { return undefined; }
            line = this.doc.lineAt(currentLine);
            regexResultForHashtagTitle = regexForHashtagTitle.exec(line.text);
            regexResultForTripleEqualTitle= regexForTripleEqualTitle.test(line.text);
        }

        if (regexResultForHashtagTitle) {
            const title = regexResultForHashtagTitle[1];
            return title;
        }

        if (regexResultForTripleEqualTitle && currentLine - 1 >= 0) {
            const title = this.doc.lineAt(currentLine - 1).text;
            return title;
        }

        return undefined;
    }
}