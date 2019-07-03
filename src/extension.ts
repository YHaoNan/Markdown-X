
import * as vscode from 'vscode';
import {MarkdownCommand} from './md_commands'
import {TitleCommand} from './title'
import {StyleCommand} from './styles'
import {ImageAndLinkCommand} from './imgandlink'
import {ListCommand} from './list'
import {TableCommand} from './table'
import {QuoteCommand} from './quote'
import {NewLineCommand} from './newline'
import {MarkdownAutoCompleteProvider} from './autocomplete'
import {preview} from './file_handler'
import * as fs from 'fs';
import * as path from 'path'

const COMMAND_LIST = [new TitleCommand(),new StyleCommand(),new ImageAndLinkCommand(),new ListCommand(),new TableCommand(),new QuoteCommand(),new NewLineCommand()];


export function activate(context: vscode.ExtensionContext) {
	COMMAND_LIST.forEach(command=>{
		context.subscriptions.push(vscode.commands.registerCommand(command.id,()=>executeCommand(command)));
	});


	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(
		{language:'markdown',scheme:'file'},
		new MarkdownAutoCompleteProvider(),'>','》'
	));

	context.subscriptions.push(vscode.commands.registerCommand('lilpig.localpreview',(path)=>{
		preview(getHexoProjectPath(path.fsPath));
	}));
}


function getHexoProjectPath(currPath:string): string{

	while(currPath!=''){
		let stat = fs.statSync(currPath);
		if(stat.isDirectory()){
			let pkgJson = path.resolve(currPath,'package.json')
			try{
				if(require(pkgJson).hexo){
					return currPath;
				}
			}catch{}
			let tmp =  path.resolve(currPath,'..');
			currPath = tmp==currPath? '':tmp;
		}else{
			//currPath默认是文件，而非目录
			let tmp =  path.resolve(currPath,'..');
			currPath = tmp==currPath? '':tmp;
		}
	}
	return '';
}
function executeCommand(command:MarkdownCommand){
	let activeEditor = vscode.window.activeTextEditor;
	if(!activeEditor)return;
	/**
	 * 先判断有没有声明default方法，有就执行，default方法是在弹出快速选择框之前执行的默认方法
	 * 
	 * 该方法如果返回true，代表默认方法执行成功并要求截断，也就是不执行快速选择。
	 * 返回false则代表该方法执行成功但不截断
	 * 返回undefined表示执行失败
	 */
	if(!(command.item['default']!=null&&command.item['default'](activeEditor))){
		showQuickPickList(activeEditor,command);
	}
}

function showQuickPickList(editor:vscode.TextEditor,command:MarkdownCommand){
	vscode.window.showQuickPick(Object.keys(command.item).filter(str=>str!='default')).then(str=>{
		if(str)
			command.item[str](editor);
	});
}
export function deactivate() {}
