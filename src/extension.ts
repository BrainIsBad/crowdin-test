import * as vscode from 'vscode';
import { HelloWorldPanel } from './HelloWorldPanel';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand('crowdin-test.helloWorld', () => {
			HelloWorldPanel.createOrShow(context.extensionUri);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('crowdin-test.askQuestion', async () => {
			const answer = await vscode.window.showInformationMessage('How was your day?', 'good', 'bad');

			if (answer === 'good') {
				console.log({answer});
			} else {
				vscode.window.showErrorMessage('It is sad :(');
			}
		})
	);
}

export function deactivate() {}
