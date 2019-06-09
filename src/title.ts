import {MarkdownCommand} from './md_commands';
import * as vscode from 'vscode'


export class TitleCommand extends MarkdownCommand{
    constructor(){
        super('lilpig.titles',{
            一级标题: toggleFirstLevelTitle,
            二级标题: toggleSecondLevelTitle,
            三级标题: toggleSecondLevelTitle,
            四级标题: toggleFourthLevelTitle,
            五级标题: toggleFifthLevelTitle,
            六级标题: toggleSixthLevelTitle
        });
    }

    
}

const toggleFirstLevelTitle = (editor:vscode.TextEditor) => toggleTitle(editor,1);
const  toggleSecondLevelTitle = (editor:vscode.TextEditor) => toggleTitle(editor,2);
const  toggleThirdLevelTitle = (editor:vscode.TextEditor) => toggleTitle(editor,3);
const  toggleFourthLevelTitle = (editor:vscode.TextEditor) => toggleTitle(editor,4);
const  toggleFifthLevelTitle = (editor:vscode.TextEditor) => toggleTitle(editor,5);
const  toggleSixthLevelTitle = (editor:vscode.TextEditor) => toggleTitle(editor,6);



/**
 * 打开或关闭标题
 *  - 当本行有标题存在，无论是几级标题，直接弄没
 *  - 当本行没有标题，加上 level 级的标题 level需要在 1-6 
 * @param editor  
 * @param level 
 */
const  toggleTitle = (editor:vscode.TextEditor,level:number) => {
    const currentLineNum = editor.selection.start.line;
    const lineText = editor.document.lineAt(currentLineNum).text;
    if(level > 0 && level <7){
        let isHasTitleMatch = lineText.match('^#+ ');
        if(isHasTitleMatch!=null){
            let titleStr = isHasTitleMatch[0];
            editor.edit((editorEdit=>{
                editorEdit.delete(new vscode.Range(new vscode.Position(currentLineNum,0),new vscode.Position(currentLineNum,titleStr.length)))
            }))
        }else{
            const titlePrifix = "#".repeat(level) + ' ';
            editor.insertSnippet(new vscode.SnippetString(titlePrifix),new vscode.Position(currentLineNum,0))
        }
    }

}