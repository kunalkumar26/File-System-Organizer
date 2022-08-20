let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organize(dirpath){
    console.log("organize command executed with path", dirpath);
    let content = fs.readdirSync(dirpath);
    let ofdir = path.join(dirpath, "Organized_Folder");
    if(fs.existsSync(ofdir) == false){
        fs.mkdirSync(ofdir);
    }
    for(let i=0; i<content.length; i++){
        let filePath = path.join(dirpath, content[i]);
        if(fs.lstatSync(filePath).isDirectory() == true){
            continue;
        }
        let destFolderName = getDestFolderName(filePath);
        copyFileToDest(filePath, ofdir, destFolderName);

        // #### old code starts
        // if(extname=='mp4' || extname=='mp3'){
        //     // move this file to media folder
        //     let mediaDir = path.join(dirName, "Media");
        //     if(fs.existsSync(mediaDir) == false){
        //         fs.mkdirSync(mediaDir);
        //     }
        //     let srcfilePath = path.join(dirpath, content[i]);
        //     let fileName = path.basename(srcfilePath);
        //     // let fileName = content[i];
        //     let destfilePath = path.join(mediaDir, fileName);
        //     fs.copyFileSync(srcfilePath, destfilePath);
        // } else if(extname=='zip'){
        //     // move this file to archives folder
        //     let archivesDir = path.join(dirName, "Archives");
        //     if(fs.existsSync(archivesDir) == false){
        //         fs.mkdirSync(archivesDir);
        //     }
        //     let srcfilePath = path.join(dirpath, content[i]);
        //     let fileName = path.basename(srcfilePath);
        //     let destfilePath = path.join(archivesDir, fileName);
        //     fs.copyFileSync(srcfilePath, destfilePath);
        // } else if(extname == 'doc' || extname=='docx'){
        //     // move this file to documents folder
        //     let documentsDir = path.join(dirName, "Documents");
        //     if(fs.existsSync(documentsDir) == false){
        //         fs.mkdirSync(documentsDir);
        //     }
        //     let srcfilePath = path.join(dirpath, content[i]);
        //     let fileName = path.basename(srcfilePath);
        //     let destfilePath = path.join(documentsDir, fileName);
        //     fs.copyFileSync(srcfilePath, destfilePath);
        // } else if(extname == 'dmg'){
        //     // move this file to app folder
        //     let appDir = path.join(dirName, "App");
        //     if(fs.existsSync(appDir) == false){
        //         fs.mkdirSync(appDir);
        //     }
        //     let srcfilePath = path.join(dirpath, content[i]);
        //     let fileName = path.basename(srcfilePath);
        //     let destfilePath = path.join(appDir, fileName);
        //     fs.copyFileSync(srcfilePath, destfilePath);
        // } else {
        //     // move this file to Other folder.
        //     let otherDir = path.join(dirName, "Others");
        //     if(fs.existsSync(otherDir) == false){
        //         fs.mkdirSync(otherDir);
        //     }
        //     let srcfilePath = path.join(dirpath, content[i]);
        //     let fileName = path.basename(srcfilePath);
        //     let destfilePath = path.join(otherDir, fileName);
        //     fs.copyFileSync(srcfilePath, destfilePath);
        // }
    }
}

function getDestFolderName(filePath){
    let extname = path.extname(filePath).substring(1);
    for(let key in types){
        for(let i=0; i<types[key].length; i++){
            if(types[key][i] == extname){
                return key;
            }
        }
    }
    return "others";
}

function copyFileToDest(filePath, ofdir, destFolderName){
    let destFolder = path.join(ofdir, destFolderName);
    if(fs.existsSync(destFolder) == false){
        fs.mkdirSync(destFolder);
    }
    let fileName = path.basename(filePath);
    let destFilePath = path.join(destFolder, fileName);
    if(fs.existsSync(destFilePath) == true){
        console.log(fileName, " already present.");
        return;
    }
    fs.copyFileSync(filePath, destFilePath);
    console.log(fileName, " copied to ", destFolderName);
}

module.exports = {
    organize: organize
}