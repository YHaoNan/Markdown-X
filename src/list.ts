import {MarkdownCommand} from './md_commands';
import * as vscode from 'vscode'
import { start } from 'repl';


/**
 * 这个代码好几天之后写的，改的乱七八糟，可以说是屎山了，不过竟然能用，就这样吧。
 */

export class ListCommand extends MarkdownCommand{
    constructor(){
        super('lilpig.list',{
            default: checkList,
            有序列表: orderedList,
            无序列表: unorderedList
        });
    }
}

const orderedList = (editor:vscode.TextEditor) => insertList(editor,true);
const unorderedList = (editor:vscode.TextEditor) => insertList(editor,false);
const checkList = (editor:vscode.TextEditor): boolean => {
    let result = false;
    editor.selections.forEach(selection=>{
        if(!selection.isEmpty){
            let startLine = selection.start.line;
            let endLine = selection.end.line;
            let currentLine = startLine;
            
            let regex = new RegExp('^([\\-|*]|^(\\d+\\.)) ');
            let isToggleToOff = editor.document.lineAt(startLine).text.match(regex)!=null;
            if(isToggleToOff){
                editor.edit(editorBuilder => {
                    while(currentLine<=endLine){
                        let currentLineText = editor.document.lineAt(currentLine).text;
                        let matchResult = currentLineText.match(regex);
                        if(matchResult){
                            editorBuilder.delete(new vscode.Range(
                                new vscode.Position(currentLine,0),
                                new vscode.Position(currentLine,matchResult[0].length)))
                        }
                        currentLine++;
                    }
                })
                result = true;
            }else{
                result = false;
            }
        }
    });
    return result;
}

const insertList = (editor:vscode.TextEditor,isOrdered:boolean) => {
    let applyCount = 0;

    editor.selections.forEach(selection=>{
        if(!selection.isEmpty){
            let startLine = selection.start.line;
            let endLine = selection.end.line;
            let currentLine = startLine;
            editor.edit(editorBuilder => {
                while(currentLine<=endLine){
                    let currentLineText = editor.document.lineAt(currentLine).text;
                    if(currentLineText==''){currentLine++;continue;}
                    if(isOrdered){
                        modifyLine((applyCount+1)+'. ',currentLine,currentLineText,editorBuilder);     
                    }else{
                        modifyLine('- ',currentLine,currentLineText,editorBuilder);         
                    }
                    currentLine++;
                    applyCount++;
                }
            })
            
        }
    });

    if(applyCount==0)
        vscode.window.showErrorMessage('应用样式前请先选中文本(仅限单行)');
}

function modifyLine(prifix:string,currentLineNumber:number,currentLineText:string,editor:vscode.TextEditorEdit){
    let match = currentLineText.match(new RegExp('^'+prifix));
    editor.insert(new vscode.Position(currentLineNumber,0),prifix);
}