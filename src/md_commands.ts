/**
 * Markdown 命令的抽象类
 */

import * as vscode from 'vscode'

export abstract class MarkdownCommand{
    constructor(public id:string,public item:{[index:string]:(editor:vscode.TextEditor)=>void}){}
}