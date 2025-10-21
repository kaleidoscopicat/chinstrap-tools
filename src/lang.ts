import * as vscode from 'vscode';
import * as pickup from './pickup';

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage("StarShade Extension Active!");
    
    const setExeCommands = vscode.commands.registerCommand("star-shade.set_exe", () => {
        vscode.window.showWarningMessage("Hello, World!");
    });

    context.subscriptions.push(setExeCommands);
}

export function deactivate() {}