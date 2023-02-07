import { prisma } from "./utils/db";
import type { Todo } from "@prisma/client"

const figlet = require("figlet");
const { Command } = require("commander");
var Table = require('cli-table');


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
        const table = new Table({
            head: ["id", "title", "description", "status"],
            colWidths: [20, 20, 20, 20]
        })
        const list: Todo | null = value;
        table.push([list?.id, list?.title, list?.desc, list?.status])

        console.log(table.toString());

    }
    )

}
if (options.List) {
    const ListTodo = async () => {
        const res = await prisma.todo.findMany()
        return res
    }

    const table = new Table({
        head: ["id", "title", "description", "status"],
        colWidths: [20, 20, 20, 20]
    })

    ListTodo().then((value) => {
        const list: Todo[] = value;

        list.map(item => {
            table.push([item.id, item.title, item.desc, item.status])
        })

        console.log(table.toString());
    })
}


if (options.TodoById) {
    console.log(options.TodoById[0])
    const id: number = parseInt(options.TodoById[0])
    const ListTodoById = async (id: number) => {
        const res = await prisma.todo.findUnique({
            where: {
                id,
            }
        })
        return res
    }

    ListTodoById(id).then((value) => {
        const table = new Table({
            head: ["id", "title", "description", "status"],
            colWidths: [20, 20, 20, 20]
        })
        const list: Todo | null = value;
        table.push([list?.id, list?.title, list?.desc, list?.status])

        console.log(table.toString());


    })
}

interface UpdateTodoInput {
    id: number;
    title: string;
    desc: string;
    status: string;
}

if (options.Update) {
    const identifier = parseInt(options.Update[0])
    const input: UpdateTodoInput = {
        id: identifier,
        title: options.Update[1],
        desc: options.Update[2],
        status: options.Update[3]
    }

    const UpdateTodo = async (input: UpdateTodoInput) => {
        const res = await prisma.todo.update({
            where: {
                id: input.id,
            },
            data: {
                title: input.title,
                desc: input.desc,
                status: input.status,
            }
        })
        return res
    }

    UpdateTodo(input).then((value) => {
        const table = new Table({
            head: ["id", "title", "description", "status"],
            colWidths: [20, 20, 20, 20]
        })
        const list: Todo | null = value;
        table.push([list?.id, list?.title, list?.desc, list?.status])

        console.log(table.toString());

    })
}
if (options.Delete) {
    const id = parseInt(options.Delete[0])

    const Del = async (id: number) => {
        return await prisma.todo.delete({
            where: {
                id,
            }
        })
    }

    Del(id).then((value) => {
        const table = new Table({
            head: ["id", "title", "description", "status"],
            colWidths: [20, 20, 20, 20]
        })
        const list: Todo | null = value;
        table.push([list?.id, list?.title, list?.desc, list?.status])

        console.log(table.toString());

    })
}
