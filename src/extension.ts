
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
import {preview, deploy, backup} from './file_handler'

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
		preview(getHexoProjectPath(path.path), vscode.window.createTerminal('Markdown X'));
	}));
	context.subscriptions.push(vscode.commands.registerCommand('lilpig.deployandbackup',(path)=>{
		const terminal = vscode.window.createTerminal("Markdown X");
		const mPath = getHexoProjectPath(path.path);
		deploy(mPath,terminal);
		backup(mPath,terminal);
	}));
}


function getHexoProjectPath(path:string): string{
	console.log(path);
	const pathArr = path.split('/');
	let resultPath = '';
	let sourceStrPos = 0;
	for(let i=pathArr.length-1;i>=0;i--){
		if(pathArr[i]=='source'){
			sourceStrPos=i;
			break;
		}
	}
	
	return pathArr.slice(0,sourceStrPos).join('/');
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
