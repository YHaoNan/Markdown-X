import {MarkdownCommand} from './md_commands';
import * as vscode from 'vscode'

export class ImageAndLinkCommand extends MarkdownCommand{
    constructor(){
        super('lilpig.imgs',{
            图片: pickImage,
            链接: insertLink
        });
    }
}

let pickImage = (editor:vscode.TextEditor) => {
    let options:vscode.OpenDialogOptions = {
        filters: {'Images': ['png','jpg','gif']},
        canSelectMany: false,
        openLabel: '确定'
    };
    vscode.window.showOpenDialog(options).then(uris=>{
        if(uris&&uris.length>0){
            vscode.window.showInputBox({value:'图片',prompt:'图片加载失败时默认显示'}).then(str=>{
                if(str)
                    editor.insertSnippet(new vscode.SnippetString("!["+str+"]("+uris[0].path+")"))
            })
        }
    });
}

let insertLink = (editor:vscode.TextEditor) => {
    vscode.window.showInputBox({prompt:'输入链接文字'}).then(str=>{
        if(str)
        vscode.window.showInputBox({prompt:'输入URL'}).then(url=>{
            if(url)
            editor.insertSnippet(new vscode.SnippetString("["+str+"]("+url+")"))
        });
    })
}
