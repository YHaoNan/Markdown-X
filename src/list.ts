import {MarkdownCommand} from './md_commands';
import * as vscode from 'vscode'
import { start } from 'repl';

export class ListCommand extends MarkdownCommand{
    constructor(){
        super('lilpig.list',{
            有序列表: orderedList,
            无序列表: unorderedList
        });
    }
}

let orderedList = (editor:vscode.TextEditor) => toggleList(editor,true);
let unorderedList = (editor:vscode.TextEditor) => toggleList(editor,false);


let toggleList = (editor:vscode.TextEditor,isOrdered:boolean) => {
    let applyCount = 0;

    editor.selections.forEach(selection=>{
        if(!selection.isEmpty){
            let startLine = selection.start.line;
            let endLine = selection.end.line;

            let currentLine = startLine;

            let isToggleToOff = editor.document.lineAt(startLine).text.startsWith((isOrdered?'1. ':'- '));

            while(currentLine<=endLine){
                let currentLineText = editor.document.lineAt(currentLine).text;
                if(currentLineText==''){currentLine++;continue;}
                if(isOrdered){
                    editor.edit(editorEdit=>{
                        modifyLine((applyCount+1)+'. ',isToggleToOff,currentLine,currentLineText,editorEdit);     
                    });
                }else{
                    editor.edit(editorEdit=>{
                        modifyLine('- ',isToggleToOff,currentLine,currentLineText,editorEdit);         
                    });
                }
                currentLine++;
                applyCount++;
            }
        }
    });

    if(applyCount==0)
        vscode.window.showErrorMessage('应用样式前请先选中文本(仅限单行)');
}

function modifyLine(prifix:string,isToggleToOff:boolean,currentLineNumber:number,currentLineText:string,editorEdit:vscode.TextEditorEdit){
    let match = currentLineText.match(new RegExp('^'+prifix));
    if(isToggleToOff && match!=null)
        editorEdit.delete(new vscode.Range(
            new vscode.Position(currentLineNumber,0),
            new vscode.Position(currentLineNumber,match[0].length)
        ))
    else
        editorEdit.insert(new vscode.Position(currentLineNumber,0),prifix);
}