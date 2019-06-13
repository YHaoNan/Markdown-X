import {MarkdownCommand} from './md_commands';
import * as vscode from 'vscode'
import {handle} from './img-handler'
export class ImageAndLinkCommand extends MarkdownCommand{
    constructor(){
        super('lilpig.imgs',{
            图片: pickImage,
            链接: insertLink
        });
    }
}

const pickImage = (editor:vscode.TextEditor) => {
    let options:vscode.OpenDialogOptions = {
        filters: {'Images': ['png','jpg','gif']},
        canSelectMany: false,
        openLabel: '确定'
    };
    vscode.window.showOpenDialog(options).then(uris=>{
        if(uris&&uris.length>0){
            vscode.window.showInputBox({value:'50',prompt:'图片质量 1-99 值越小图片越小'}).then(str=>{
                try{
                    let complv = parseInt(str as string);
                    if(complv>=1 && complv<100){
                        handle(uris[0].fsPath,50,(err,data)=>{
                            if(err){
                                vscode.window.showErrorMessage(err);
                            }else{
                                editor.insertSnippet(new vscode.SnippetString("![${1:图片}]("+data+")"));
                            }
                        });
                    }else{
                        vscode.window.showErrorMessage('输入不合法');
                    }
                }catch{

                }
                
            })
        }
    });
}

const insertLink = (editor:vscode.TextEditor) => {
    vscode.window.showInputBox({prompt:'输入链接文字'}).then(str=>{
        if(str)
        vscode.window.showInputBox({prompt:'输入URL'}).then(url=>{
            if(url)
            editor.insertSnippet(new vscode.SnippetString("["+str+"]("+url+")"))
        });
    })
}
