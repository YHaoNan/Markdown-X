import {MarkdownCommand} from './md_commands';
import * as vscode from 'vscode'

export class QuoteCommand extends MarkdownCommand{
    constructor(){
        super('lilpig.quote',{
            文本块: textBlock,
            代码块: codeBlock,
            Latex: latexBlock,
            阳光: sunshineBlock,
            清爽: simpleBlock,
            序号: numBlock,
        });
    }
}

const textBlock = (editor:vscode.TextEditor) =>{
    editor.selections.forEach(selection=>{
        editor.insertSnippet(new vscode.SnippetString('> '),selection.start)
    })
}
const latexBlock = (editor:vscode.TextEditor) =>{
    editor.selections.forEach(selection=>{
        editor.insertSnippet(new vscode.SnippetString('\$\$\n$1\n\$\$'),selection.start)
    })
}
const codeBlock = (editor:vscode.TextEditor) =>{
    let supportLanguages = ['applescript','applescript3','bash','coldfusion','c','csharp','css','delphi','diff','erl','groovy','java','javafx','javascript','perl','php','text','plain','python','ruby','sass','scala','sql','vb','xml','objc','fsharp','r','matlab','swift','go','json','yaml','html','typescript','custom']
    vscode.window.showQuickPick(supportLanguages).then(str=>{
        if(str){
            if(str=='custom'){
                str='{$1:language}';
            }
            editor.insertSnippet(new vscode.SnippetString('```'+str+'\n$2\n```'));
        }
    });
}

const highLevelStyle = (editor:vscode.TextEditor,_class:string) =>{
    editor.selections.forEach(selection=>{
        editor.edit(editorEdit=>{
            editorEdit.insert(selection.start,'<span class="highlevel-style '+_class+'">\n<section class="top"></section><span class="'+_class+'-text">');
            editorEdit.insert(selection.end,'</span><section class="bottom"></section></span>')
        })
    })
}

const sunshineBlock = (editor:vscode.TextEditor) =>{
    highLevelStyle(editor,'sunshine');
}

const simpleBlock = (editor:vscode.TextEditor) =>{
    highLevelStyle(editor,'simple');
}

const numBlock = (editor:vscode.TextEditor) =>{
    vscode.window.showInputBox({prompt:'输入要显示的序号'}).then(str=>{
        if(str){
            vscode.window.showInputBox({prompt:'输入要显示的标题'}).then(title=>{
                if(title){
                    editor.selections.forEach(selection=>{
                        editor.edit(editorEdit=>{
                            editorEdit.insert(selection.start,'<span class="highlevel-style num">\n<section class="num-first"><section style="width:15%;"><section class="num-second"><section class="num-third"><p><strong><span class="num_num" style="color: #ffffff;">'+str+'</span></strong></p></section></section></section><section class="num-fourth"><section style="margin-left:5px;"><section class="num-fifth"><section style="margin-top: -14px;"><section class="num-sixth"><p><span class="num_title">'+title+'</span></p></section></section></section></section><section style="margin:5px 0px;"><p><span style="font-size: 14px;">');
                            editorEdit.insert(selection.end,'</span></p></section></section></section>')
                        })
                    })
                }
            })
        }
    });
}

