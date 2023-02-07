import { prisma } from "./utils/db";

const figlet = require("figlet");
const { Command } = require("commander"); // add this line


const program = new Command();


console.log(figlet.textSync("Todo-CLI"));


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

interface CreateTodoInput {
    title: string;
    desc: string;
}

if (options.Todo) {
    console.log(options.Todo[0])
    console.log(options.Todo[1])
    const input: CreateTodoInput = {
        title: options.Todo[0],
        desc: options.Todo[1]
    }
    const createTodo = async (input: CreateTodoInput) => {
        const res = await prisma.todo.create({
            data: {
                title: input.title,
                desc: input.desc,
            }
        })
        return res
    }

    createTodo(input).then((value) => {
        console.log(value)
    }
    )

}
if (options.List) {
    const ListTodo = async () => {
        const res = await prisma.todo.findMany()
        return res
    }

    ListTodo().then((value) => console.log(value))
}
if (options.TodoById) console.log(options.TodoById);
if (options.Update) console.log(options.Update);
if (options.Delete) console.log(options.Delete);
