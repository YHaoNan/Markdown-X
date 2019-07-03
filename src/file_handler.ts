/**
 * Deploy and backup, preview in local.
 */
import * as vscode from 'vscode'
import {exec} from 'child_process'
import * as utils from './utils'
const express = require('express')
const pathM = require('path')
const app = express()

let isInited = false;
let port = utils.getConfig<number>("lilpig.localpreviewport");

export let preview = async (path:string) => {
    if(path==''){
        vscode.window.showErrorMessage("您不在一个hexo项目中...");return;
    }
    await vscode.window.withProgress({
        title: `Synchronizing...`,
        location: vscode.ProgressLocation.Notification,
    }, async () => {
        exec("cd \""+path+"\" && hexo g",(err,stdout,stderr)=>{
            if(!err){
                    if(!isInited){
                        app.use(express.static(pathM.join(path, 'public')))
                        app.listen(port, () => {
                            isInited = true;
                        })
                    }
                    vscode.window.showInformationMessage(!isInited?`本地预览已在${port}中打开`:`Done...`,'尝试在Chrome中打开').then(str=>{
                        if(str=='尝试在Chrome中打开')
                            exec('google-chrome http://localhost:'+port);
                    });
            }else vscode.window.showErrorMessage("运行失败:"+err.message);
        });
    });
}
