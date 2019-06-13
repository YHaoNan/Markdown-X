import {MarkdownCommand} from './md_commands';
import * as vscode from 'vscode'

export class NewLineCommand extends MarkdownCommand{
    constructor(){
        super('lilpig.newline',{
            default:newLine
        });
    }
}

const newLine = (editor:vscode.TextEditor) => {
    const selection = editor.selection;
    //只有当当前不是选中状态的时候才会起作用
    if(selection.isEmpty){
        if(selection.start.character<2){
            editor.insertSnippet(new vscode.SnippetString('\n'));
            return true;
        }
        let newLineSpaceRange = new vscode.Range(
            new vscode.Position(selection.end.line,selection.end.character-2),
            new vscode.Position(selection.end.line,selection.end.character)
        );
        if(editor.document.getText(newLineSpaceRange)=='  '){
            editor.insertSnippet(new vscode.SnippetString('\n'));
        }else{
            editor.insertSnippet(new vscode.SnippetString('  \n'));
        }
    }
    return true;
}