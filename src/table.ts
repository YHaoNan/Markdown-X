import {MarkdownCommand} from './md_commands';
import * as vscode from 'vscode'

export class TableCommand extends MarkdownCommand{
    constructor(){
        super('lilpig.table',{
            default:insertTable
        });
    }
}

const insertTable = (editor: vscode.TextEditor): boolean => {
    vscode.window.showInputBox({prompt:'请输入表格大小，格式：M,N，生成MxN的表格'}).then(str=>{
        if(str){
            let mn = str.split(',');
            if(mn.length!=2){showError('输入不合法');return true;}
            try{
                let cursorIndex = 1;
                let m = parseInt(mn[0]);
                let n = parseInt(mn[1]);
                let snippetString = '';
                for(let i=1;i<=n;i++){
                    console.log(i,n);
                    snippetString+='${'+cursorIndex+':标题'+(cursorIndex++)+'}'+((i!=n)?'|':'');
                }
                snippetString+='\n'+':-:|'.repeat(n-1)+':-:'+'\n';
                for(let i=1;i<=m;i++){
                    for(let j=1;j<=n;j++){
                        snippetString+="${"+(cursorIndex++)+":ITEM"+i+","+j+"}"+((j!=n)?"|":"");
                    }
                    snippetString+='\n';
                }
                console.log(snippetString);

                editor.insertSnippet(new vscode.SnippetString(snippetString),editor.selection.start);
            }catch(e){
                showError('输入不合法');
                return true;
            }
        }
    });

    return true;
}
const showError = (msg:string):void => {
    vscode.window.showErrorMessage(msg);
}