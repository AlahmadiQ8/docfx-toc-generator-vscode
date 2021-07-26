import { DocFxItem } from "./docfx-item";

export const filenameComparer = (a: DocFxItem, b: DocFxItem) => b.uri.path.localeCompare(a.uri.path);