let helpObj = require("./folder/help");
let organizeObj = require("./folder/organize");
let treeObj = require("./folder/tree");

let input = process.argv.slice(2);

if(input[0] == 'help'){
    helpObj.help();
} else if(input[0] == 'tree'){
    treeObj.tree(input[1]);
} else if(input[0] == 'organize'){
    organizeObj.organize(input[1]);
} else {
    console.log("Wrong input. Please try again with correct input.");
}