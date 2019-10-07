import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TodoDto} from "./dtos/Todo.dto";
import {TodoInterface} from "./interfaces/Todo.interface";
import {TodoService} from "./todo.service";

@Controller('todos')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Get()
    async index(): Promise<TodoInterface[]> {
        return this.todoService.getTodos()
    }

    @Get(':id')
    async show(@Param('id') id: string): Promise<TodoInterface> {
        return this.todoService.getTodo(id)
    }

    @Post()
    async store(
        @Body() todo: TodoDto
    ) {
        return this.todoService.saveTodo(todo)
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() todo: TodoDto
    ) {
        return this.todoService.updateTodo(id, todo)
    }

    @Delete(':id')
    async destroy(
        @Param('id') id: string
    ): Promise<any> {
        return this.todoService.deleteTodo(id)
    }

    @Put('delete/all')
    async destroyAll(
        @Body() vals: TodoDto[]
    ): Promise<any> {
        vals.forEach(v => {
            this.todoService.deleteTodo(v._id)
        });

        return {"msg": "Successfully deleted"}
    }
}

