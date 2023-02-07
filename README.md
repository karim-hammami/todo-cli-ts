# Todo list CLI made with Node.js, Typescript and Prisma

## Run

```
npx tsc && node ./dist/index.js -[args] 
```
---

## Args 

..* -l => list all todo items
..* -li => list a single todo item by id => the only arg here is the id: number
..* -m => create a todo item {first_arg: title, second_arg: description}
..* -u => update a todo item by id => {first_arg: id, second_arg: title, third_arg: description, forth_arg: status}
..* -d => delete a todo item by id => the only arg here is the id: number

