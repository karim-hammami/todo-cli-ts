"use strict";
const figlet = require("figlet");
const { Command } = require("commander"); // add this line
const program = new Command();
console.log(figlet.textSync("Todo-CLI"));
function handleL() {
    console.log(`-L argument`);
}
function handleLI() {
    console.log("you chose -li argument");
}
function handleU() {
    console.log("you chose -u argument");
}
function handleD() {
    console.log("you chose -d argument");
}
program
    .version("1.0.0")
    .description("a todo list cli tool")
    .option("-l, --List", "List all todo item")
    .option("-m, --Todo <type...>", "create a todo item")
    .option("-li, --TodoById <type>", "list a single todo item by id")
    .option("-u, --Update <type...>", "update a single todo item by id")
    .option("-d, --Delete <type>", "delete a single todo item by id")
    .parse(process.argv);
const options = program.opts();
if (options.Todo)
    console.log(options.Todo);
if (options.List)
    console.log("all todos");
if (options.TodoById)
    console.log(options.TodoById);
if (options.Update)
    console.log(options.Update);
if (options.Delete)
    console.log(options.Delete);
//# sourceMappingURL=index.js.map