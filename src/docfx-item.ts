import * as path from 'path';
import { Uri } from "vscode";

type ItemFormatter = (name: string, path: string) => string;

function yamlFormatter(name: string, path: string) {
    return `- name: ${name}\n  href: ${path}`;
}

export class DocFxItem {
    private name: string;

    // TODO: make private once DocFxItems Class is implemented to define custome sorting
    public uri: Uri;
    public itemFormatter: ItemFormatter;

    constructor(name: string, path: Uri, itemFormatter: ItemFormatter = yamlFormatter) {
        this.name = name;
        this.uri = path;
        this.itemFormatter = itemFormatter;
    }

    toString(): string {
        const filePath = path.basename(this.uri.fsPath);
        return this.itemFormatter(this.name, filePath);
    }
}