import { BadRequestException, Injectable, Param, Patch } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from 'src/models/todo.models';

@Injectable()
export class TodosService {
    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}
//   todos: Todo[] = [
//         { id: '0', title: 'Create a course', completed: true },
//         { id: '1', title: 'Go to a store', completed: false },
//         { id: '2', title: 'Wash a car', completed: true },
//     ];

    //Create a new Todo
    async createTodo(todo: Todo): Promise<{message: string, result: Todo}> {
        if(todo.title === ''){
            throw new BadRequestException({statusCode: '20000' ,message: 'Provide a valid title', status: false});
        };

        const newTodo = new this.todoModel(todo);
        const result = await newTodo.save();
        return {message: 'Todo created successfully', result};
    };

    // Getting Todos
    async getTodos(): Promise<Todo[]> {
        return this.todoModel.find();
    };

    // Get specific Todo
    async getTodo(todoId: string): Promise<Todo> {
        return this.todoModel.findById(todoId);
    };

    // Update Todos
    async updateTodo(todoId: string, todo: Todo): Promise<{message: string, result: Todo}> {
        if(todo.title === ''){
            throw new BadRequestException({statusCode: '20000', message: 'Provide a valid title', status: false});
        };

        const result = await this.todoModel.findOneAndUpdate({id: todoId}, todo, {new: true});
        return {message: 'Todo updated successfully', result};
    };

    // Detete a todo
    async deleteTodo(todoId: string): Promise<{status: Boolean, message: string}> {
        await this.todoModel.deleteOne({id: todoId}).exec();
        return {status: true, message: 'Todo deleted successfully'};
    };
};
