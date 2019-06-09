
import * as vscode from 'vscode';
import {MarkdownCommand} from './md_commands'
import {TitleCommand} from './title'
import {StyleCommand} from './styles'
import {ImageAndLinkCommand} from './imgandlink'
import {ListCommand} from './list'


const COMMAND_LIST = [new TitleCommand(),new StyleCommand(),new ImageAndLinkCommand(),new ListCommand()];


export function activate(context: vscode.ExtensionContext) {
	COMMAND_LIST.forEach(command=>{
		context.subscriptions.push(vscode.commands.registerCommand(command.id,()=>executeCommand(command)));
	});
}

function executeCommand(command:MarkdownCommand){
	vscode.window.showQuickPick(Object.keys(command.item)).then(str=>{
		if(str && vscode.window.activeTextEditor)
			command.item[str](vscode.window.activeTextEditor);
	});
}

export function deactivate() {}
