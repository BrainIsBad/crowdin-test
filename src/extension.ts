import * as vscode from 'vscode';

import crowdin from '@crowdin/crowdin-api-client';

import {getCrowdinConfig} from './get-crowdin-config';
import { SidebarProvider } from './SidebarProvider';


export async function activate(context: vscode.ExtensionContext) {
	const config = getCrowdinConfig();

	if (!config) {return null;}
	
	const { projectsGroupsApi } = new crowdin(config);

	try {
		await projectsGroupsApi.listProjects();
	} catch {
		return null;
	}
	
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('crowdin-test-sidebar', sidebarProvider)
	);
}

export function deactivate() {}
