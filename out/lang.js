"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
let outputChannel;
function activate(context) {
    outputChannel = vscode.window.createOutputChannel("Chinstrap Compilation");
    context.subscriptions.push(outputChannel);
    vscode.window.showInformationMessage("Chinstrap Extension Active!");
    const setExeCommand = vscode.commands.registerCommand("chinstrap.set_exe", async () => {
        const fileUri = await vscode.window.showOpenDialog({
            canSelectMany: false,
            openLabel: "Select Executable",
            filters: process.platform === "win32" ? { "Executable Files": ["exe"] } : undefined,
        });
        if (fileUri && fileUri[0]) {
            const exePath = fileUri[0].fsPath;
            await context.globalState.update("ChinstrapExePath", exePath);
            vscode.window.showInformationMessage(`Executable set to: ${exePath}`);
        }
        else {
            vscode.window.showWarningMessage("No executable selected.");
        }
    });
    const compileCommand = vscode.commands.registerCommand("chinstrap.compile", async () => {
        const exePath = context.globalState.get("ChinstrapExePath");
        if (!exePath) {
            vscode.window.showErrorMessage("Executable path not set. Use 'Set Chinstrap Compiler' first.");
            return;
        }
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active file to compile.");
            return;
        }
        const filePath = editor.document.uri.fsPath;
        outputChannel.clear();
        outputChannel.show(true);
        outputChannel.appendLine(`Running: ${exePath} ${filePath}\n`);
        const child = (0, child_process_1.execFile)(exePath, [filePath], (error, stdout, stderr) => {
            if (error) {
                outputChannel.appendLine(`Compilation failed: ${error.message}`);
                return;
            }
            if (stderr) {
                outputChannel.appendLine(`Compiler stderr: ${stderr}`);
            }
            outputChannel.appendLine(`Compilation output:\n${stdout}`);
        });
        child.on("close", (code) => {
            outputChannel.appendLine(`\nProcess exited with code ${code}`);
        });
    });
    context.subscriptions.push(setExeCommand, compileCommand);
}
function deactivate() { }
//# sourceMappingURL=lang.js.map