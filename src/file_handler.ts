/**
 * Deploy and backup, preview in local.
 */
import * as vscode from 'vscode'
import { transcode } from 'buffer';


export let deploy = (path:string,terminal:vscode.Terminal):void => {
    execute(['cd '+path,"hexo g","hexo d"],terminal);
}

export let preview = (path:string,terminal:vscode.Terminal) => {
    execute(["cd "+path,"hexo g","hexo s"],terminal);
}

export let backup = (path:string,terminal:vscode.Terminal) => {
    execute(['cd '+path,'git add .','git commit * -m "NONE"','git push -f origin dev'],terminal);
}

export let execute = (command:string[],terminal:vscode.Terminal) =>{
    console.log(command);
    command.forEach(str=>{
        terminal.sendText(str);
    })
}