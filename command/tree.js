let path = require("path");
let fs = require("fs");

function tree(dirpath, len){
    console.log("tree command executed with path", dirpath);
    let dirName = path.basename(dirpath);
    console.log(dirName);
    let content = fs.readdirSync(dirpath);
    // console.log(content);
    for(let i=0; i<content.length; i++){
        console.log("\t",content[i]);
    }
}

module.exports = {
    tree: tree
}