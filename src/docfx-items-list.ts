import * as vscode from 'vscode';
import { filenameComparer } from "./comparers";
import { DocFxItem } from "./docfx-item";
import { SortingType } from "./configurations";

type CompareFn = (a: DocFxItem, b: DocFxItem) => number;

export function docFxItemsListFactory(sortingType: SortingType): DocFxItemsList {
    // vscode.workspace.getConfiguration
    switch (sortingType) {
        case SortingType.fileName:
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
