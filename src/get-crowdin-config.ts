const path = require('path');
const fs = require('fs');
import * as vscode from 'vscode';

export const getCrowdinConfig = () => {
    try {
        const configPath = path.resolve(vscode.workspace.rootPath || '', 'crowdin.json');
	    const exists = fs.existsSync(configPath);
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

        if (!exists) {return null;}

        return config;
    } catch {
        return null;
    }
};