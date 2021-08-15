# DocFx Toc Generator for Visual Studio Code

Generate [DocFx](https://dotnet.github.io/docfx/index.html) Toc directly from VS Code. Simply right click on a folder and select "Generate YAML Toc".

![DocFx Toc Generator for Visual Studio Code Demo](assets/docfx-vscode.gif)

## Work in Progress

- Support sorting using .order file from Aure Devops
- Toc for sub directories recursively.

## Requirements

The extension is only activated if there is a `docfx.json` file in the active workspace.

## Extension Settings

* `docFxToc.orderBy`: ascending/descending

<!-- ## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something -->

<!-- ## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension. -->

## Release Notes

### 0.0.1

* Initial release.

### 0.0.2

* Refactoring to support different sorting strategies.

### 0.0.3

* Added support to configure sorting ascending or descending.