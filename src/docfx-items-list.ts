import * as vscode from 'vscode';
import { filenameComparer } from "./comparers";
import { DocFxItem } from "./docfx-item";
import { SortingTypeOptions } from "./configurations";

type CompareFn = (a: DocFxItem, b: DocFxItem) => number;

export function docFxItemsListFactory(sortingType: SortingTypeOptions): DocFxItemsList {
    const asc = vscode.workspace.getConfiguration().get("docFxToc.orderBy") === "ascending";
    switch (sortingType) {
        case SortingTypeOptions.fileName:
            return new DocFxItemsList(filenameComparer, asc);
        default:
            return new DocFxItemsList(filenameComparer, asc);
    }
}

export class DocFxItemsList {
    private items: Array<DocFxItem> = [];
    private sortingStrategy: CompareFn;
    private asc: boolean;

    constructor(sortingStrategy: CompareFn, asc: boolean) {
        this.sortingStrategy = sortingStrategy;
        this.asc = asc;
    }

    public add(item: DocFxItem): void {
        this.items.push(item);
    }

    public toString(): string {
        this.sort();
        return this.items.map(item => item.toString()).join('\n');
    }

    private sort() {
        if (this.asc) {
            this.items.sort((a, b) => this.sortingStrategy(a, b));
        } else {
            this.items.sort((a, b) => this.sortingStrategy(b, a));
        }
    }
}
