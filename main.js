#!/usr/bin/env node
let inputArr = process.argv.slice(2); // to take input in cmd
let fs = require('fs');
let path = require('path');
let helpObject = require('../Project/Commands/help');
let treeObj = require('../Project/Commands/tree');
let organizeObj=require('../Project/Commands/organize');
console.log(inputArr);

// comd organize "directoryPath"
// comd tree "directoryPath"
// comd help

let command = inputArr[0];
let types={
    media : ["mp4","mkv"],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xls','xlsx','odt','ods','odp','odg','odf','txt','ps','tex'],
    app:['exe','dmg','pkg',"deb"]
}
switch(command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.orangizeKey(inputArr[1]);
        break;
    case "help":
        helpObject.helpKey();
        break;
    default:
        console.log("Please input right command");        
}



