import {Inject, Injectable} from '@nestjs/common'
import {Model} from "mongoose"
import {TodoDto} from "./dtos/Todo.dto"
import {TodoInterface} from "./interfaces/Todo.interface"
import Any = jasmine.Any;

@Injectable()
export class TodoService {
    constructor(@Inject('TODO_MODEL') private readonly todoModel: Model<TodoInterface>) {}

    async getTodos(): Promise<TodoInterface[]> {
        return await this.todoModel.find().exec()
    }

    async getTodo(id: string): Promise<TodoInterface> {
        return await this.todoModel.findOne({_id: id})
    }

    async saveTodo(todo: TodoDto): Promise<TodoInterface> {
        const response = new this.todoModel(todo);
        return await response.save()
    }

    async updateTodo(id: string, todo: TodoDto): Promise<TodoInterface> {
        const response = new this.todoModel(todo);
         await response.updateOne(todo)

        return this.todoModel.findOne({_id: id})
    }

    async deleteTodo(id: string): Promise<any> {
        return this.todoModel.deleteOne({_id:id})
    }
}
