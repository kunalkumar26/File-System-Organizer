let helpObj = require("./command/help");
let organizeObj = require("./command/organize");
let treeObj = require("./command/tree");

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