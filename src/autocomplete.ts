import * as vscode from 'vscode'
import { EDEADLK } from 'constants';

export class MarkdownAutoCompleteProvider implements vscode.CompletionItemProvider{
    
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        const char = document.lineAt(position.line).text.substr(position.character-1,position.character);
        if(char != '>' && char !='》')
            return;
        const range = getWordRange(document,position);
        const currentWord = document.getText(range);
        let result:vscode.CompletionItem[] = []
        Object.keys(RULES).forEach(regex=>{
            let match = currentWord.match(regex);
            if(match){
                console.log('matched');
                result = result.concat(RULES[regex](match,range));
            }
            
        });
        return result?Promise.resolve(result):null;
    }

} 
function getWordRange(document:vscode.TextDocument,position: vscode.Position):vscode.Range{
    let pos = position.character;
    let text = document.lineAt(position.line).text;
    while(pos>0&&text.charAt(pos)!=' ')
        pos--;
    let firstIndex = text.charAt(pos)==' '?pos+1:pos;
    return new vscode.Range(
        new vscode.Position(position.line,firstIndex),
        position);
}

const style = (match: RegExpMatchArray,range:vscode.Range):vscode.CompletionItem[] => {
    const titleMap:{[index:string]:string} = {'b':'粗体 b','i':'斜体 i','bi':'粗斜体 bi','d':'删除线 d','h':'高亮块 h'}
    const optMap:{[index:string]:string} = {'b':'**','i':'*','bi':'***','d':'~~','h':'`'}
    let completionList:vscode.CompletionItem[] = [];

    Object.keys(titleMap).forEach(key=>{
        let item = new vscode.CompletionItem(titleMap[key],vscode.CompletionItemKind.Snippet);
        let text = optMap[key]+match[1]+optMap[key];
        item.documentation = new vscode.MarkdownString('## 插入样式\n\n'+text);
        item.detail = '样式转换';
        item.insertText = text;
        item.filterText = key;
        item.additionalTextEdits = [vscode.TextEdit.delete(range)]
        completionList.push(item);

        if(range.start.character>0){
            let rangeWithSpace = new vscode.Range(new vscode.Position(range.start.line,range.start.character-1),range.end);
            if((vscode.window.activeTextEditor as vscode.TextEditor).document.getText(rangeWithSpace).startsWith(' ')){
                let itemNoSpace = new vscode.CompletionItem(titleMap[key]+' no-space',vscode.CompletionItemKind.Snippet);
                itemNoSpace.documentation = new vscode.MarkdownString('## 插入样式\n\n'+text);
                itemNoSpace.detail = '样式转换';
                itemNoSpace.insertText = text;
                itemNoSpace.filterText = key+'nospace';
                itemNoSpace.additionalTextEdits = [vscode.TextEdit.delete(rangeWithSpace)]
                completionList.push(itemNoSpace);
            }
        }
    })
    

    return completionList;
}

const list = (match: RegExpMatchArray,range:vscode.Range):vscode.CompletionItem[]=> {
    const titleMap:{[index:string]:string} = {'u':'无序列表 unorderd list','o':'有序列表 orderd list'}
    const filterMap:{[index:string]:string} = {'u':'ul','o':'ol'}
    const optMap:{[index:string]:string} = {'u': '- '}
    let completionList:vscode.CompletionItem[] = [];

    let count = parseInt(match[1]);
    Object.keys(titleMap).forEach(key=>{
        let loopVar = 1;

        let item = new vscode.CompletionItem(titleMap[key],vscode.CompletionItemKind.Snippet);
        item.detail = '列表生成';
        let text = '';
        while(loopVar<=count){
            if(key=='o'){
                text+=loopVar+'. '+'${'+loopVar+':item'+loopVar+'}';
            }else
                text+=((optMap[key])+'${'+loopVar+':item'+loopVar+'}');
            if(loopVar++!=count) text+='\n';
        }
        console.log(text);
        item.documentation = '生成 ' + count +' 个'+titleMap[key];
        item.filterText = filterMap[key];
        item.insertText = new vscode.SnippetString(text);
        item.additionalTextEdits = [vscode.TextEdit.delete(range)]
        completionList.push(item);
    })
    
    return completionList;
}

const table = (match: RegExpMatchArray,range:vscode.Range):vscode.CompletionItem[] => {
    const filterMap:{[index:string]:string} = {'l':'lt','r':'rt'}
    const titleMap:{[index:string]:string} = {'l':'左对齐表格 left table','c':'居中对齐表格 center table','r':'右对齐表格 right table'};
    const optMap:{[index:string]:string} = {'l':':-','c':':-:','r':'-:'};
    let completionList:vscode.CompletionItem[] = [];

    let m = parseInt(match[1]);
    let n = parseInt(match[2]);

    Object.keys(titleMap).forEach(key=>{
        let item = new vscode.CompletionItem(titleMap[key],vscode.CompletionItemKind.Snippet);
        item.detail = '表格生成';
        item.documentation = '生成' + m+'*'+n+' 表格';
        let text = '';
        for(let N = 1;N<=n;N++){
            text+=("${"+N+":TITLE"+N+"}");
            if(N!=n)text+="|";
        }

        let count = n+1;

        text+=("\n"+((optMap[key])+"|").repeat(n-1)+(optMap[key])+"\n");

        for(let M = 1;M<=m;M++){
            for(let N=1;N<=n;N++){
                text+='${'+(count++)+':ITEM'+M+','+N+'}';
                if(n!=N)text+='|'
            }
            text+='\n';
        }


        item.filterText = filterMap[key];
        item.insertText = new vscode.SnippetString(text);
        item.additionalTextEdits = [vscode.TextEdit.delete(range)];
        completionList.push(item);
    });
    return completionList;
}


const RULES:{[index:string]:(match: RegExpMatchArray,range:vscode.Range)=>vscode.CompletionItem[]} = {
    '(\\d+)[\\>|》]':list,
    '(\\d+),(\\d+)[\\>|》]':table,
    '(.*?)[\\>|》]':style
}
