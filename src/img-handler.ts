const HttpRequest = require('ufile').HttpRequest;
const AuthClient = require('ufile').AuthClient;
import {exec} from 'child_process'
import {getConfig} from './utils'
import * as vscode from 'vscode'
import { pathToFileURL } from 'url';
import {join} from 'path';

export function handle(source:string,compressLevel:number,callback:(err:string|undefined,data:string|undefined)=>void){
    let handler_path = <string>getConfig('lilpig.imghandler_script');
    let ucloudPublicKey = <string>getConfig('lilpig.ucloud_publickey');
    let ucloudPrivateKey = <string>getConfig('lilpig.ucloud_privatekey');
    let bucketName = <string>getConfig('lilpig.ucloud_bucketname');
    let ucloudDomain = <string>getConfig('lilpig.ucloud_domain');

    let backupDir = <string>getConfig('lilpig.backupdir');
    
    let upload_name = 'img-'+new Date().getTime()+'.jpg';

    let command = 'python3 "'+handler_path+'" "'+ source+'" '+compressLevel+' "'+join(backupDir,upload_name)+'"';
    console.log(command);
    exec(command,(err,stdout,stderr)=>{
        if(err){
            callback("调用压缩脚本出错："+stderr,undefined);
            return;
        }
        if(stdout){
            let upload_img_path = '';
            let result = stdout.split(':');
            if(result.length<2){
                callback("脚本返回结果出错，返回："+stdout,undefined);
                return;
            }
            if(result[0]=='200'){
                upload_img_path = result[1];
                console.log(upload_name,upload_img_path);

                const req = new HttpRequest('POST','/',bucketName,upload_name,backupDir+'/'+upload_name);
                const client = new AuthClient(req,ucloudPublicKey,ucloudPrivateKey,ucloudDomain);
                client.SendRequest((res:any)=>{
                    console.log(res);
                    if(res instanceof Error){
                        callback('上传错误：'+res.message,undefined);
                        return;
                    }
                    if(res.statusCode != 200){
                        callback('上传错误：'+res.statusCode,undefined);
                        return;
                    }
                    callback(undefined,'http://'+bucketName+ucloudDomain+'/'+upload_name);
                    
                });
            }else{
                callback("压缩错误："+result[1],undefined);
            }
        }
    });
    
}