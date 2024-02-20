let fs = require('fs');
let path = require('path');
let types={
  media : ["mp4","mkv"],
  archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
  documents:['docx','doc','pdf','xls','xlsx','odt','ods','odp','odg','odf','txt','ps','tex'],
  app:['exe','dmg','pkg',"deb"]
}
function orangizeFunc(dirPath){
    console.log("Orangize command is implemented for",dirPath);
    // step1. input -> directory path given
    let pathDest;
     if(dirPath==undefined){
        destPath = process.cwd();
        return;
     }
     else{
       let doesExist = fs.existsSync(dirPath);
       if(doesExist){
         // step2. create -> organized_files -> directory path 
          pathDest = path.join(dirPath,"organized_files");
         if(fs.existsSync(pathDest)==false){
            fs.mkdirSync(pathDest);
         }

       }
       else{
        console.log("Kindly enter the correct directory path");
        return;
       }
     }
     organizeHelper(dirPath, pathDest);
    
}

function organizeHelper(src, dest){
     
    // step3. identify the categories of all the files present in the input directory
    let childNames = fs.readdirSync(src);
    //console.log(childNames);
    for(let i=0;i<childNames.length;i++){
      let childaddress = path.join(src,childNames[i]);
      let isFile = fs.lstatSync(childaddress).isFile();
      if(isFile){
        //console.log(childNames[i]);
        // step4. copy/cut files to that organized directory 
        let category = getCategory(childNames[i]);
        //console.log(childNames[i],"belongs to --->",category);
        sendFiles(childaddress,dest,category);
      }
    }
}

function sendFiles(srcFilePath, dest, category){
   let categoryPath = path.join(dest,category);
   if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
   } 
   let fileName = path.basename(srcFilePath);
   let destFilePath = path.join(categoryPath, fileName) ;
   fs.copyFileSync(srcFilePath, destFilePath);
   fs.unlinkSync(srcFilePath);
   console.log(fileName,"copied to",category);
}

function getCategory(name){
    let ext = path.extname(name);
   ext = ext.slice(1);// to remove dot from the extension
   for(let type in types){
    let cTypeArray = types[type];
    for(let i=0;i<cTypeArray.length;i++){
        if(ext == cTypeArray[i]){
            return type;
        }
    }
   }
   return "others";
}

module.exports={
    orangizeKey:orangizeFunc
}