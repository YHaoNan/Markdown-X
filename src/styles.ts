import {MarkdownCommand} from './md_commands';
import * as vscode from 'vscode'

export class StyleCommand extends MarkdownCommand{
    constructor(){
        super('lilpig.styles',{
            粗体: bold,
            斜体: italic,
            粗斜体: boldItalic,
            强调块: highlightBlock,
            删除线: deleteLine
        });
    }
}

const bold = (editor:vscode.TextEditor) => applyStyle(editor,'**');
const italic = (editor:vscode.TextEditor) => applyStyle(editor,'*');
const boldItalic = (editor:vscode.TextEditor) => applyStyle(editor,'***');
const highlightBlock = (editor:vscode.TextEditor) => applyStyle(editor,'`');
const deleteLine = (editor:vscode.TextEditor) => applyStyle(editor,'~~');

/**
 * 如果有样式就删除，没有就不做响应
 * @param editor 
 * @param wrapper 
 */
function applyStyle(editor:vscode.TextEditor,wrapper:string){
    let applyCount = 0;
    editor.selections.forEach(selection=>{
        if(!selection.isEmpty){
            let text = editor.document.getText(selection);
            if(selection.isSingleLine){
                let currentLineNumber = selection.start.line;
                let startPos = selection.start.character;
                let endPos = selection.end.character;
                if(text.startsWith(wrapper)&&text.endsWith(wrapper)){
                    editor.edit(editorEdit=>{
                        editorEdit.delete(new vscode.Range(new vscode.Position(currentLineNumber,endPos-wrapper.length),selection.end));
                        editorEdit.delete(new vscode.Range(selection.start,new vscode.Position(currentLineNumber, startPos+wrapper.length)));
                    });
                }else{
                    editor.edit(editorEdit=>{
                        editorEdit.insert(selection.end,wrapper);
                        editorEdit.insert(selection.start,wrapper);
                    })
                }
                applyCount++;
            }
        }
    });
    if(applyCount==0)
        vscode.window.showErrorMessage('应用样式前请先选中文本(仅限单行)');
}