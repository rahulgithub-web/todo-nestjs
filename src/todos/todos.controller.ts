import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Todo } from 'src/models/todo.models';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    // Getting All Todos
    // Create a new todo
    @Post()
    createTodo(@Body() body: Todo): Promise<{message: string, result:Todo}> {
        return this.todosService.createTodo(body);
    };

    @Get()
    getTodos(): Promise<Todo[]> {
        return this.todosService.getTodos();
    };

    // Get specific Todo  
    @Get(':todoId') 
    getTodo(@Param('todoId') todoId: string): Promise<Todo> {
        return this.todosService.getTodo(todoId);
    };

    // Update Todos
    @Patch(':todoId')
    updateTodo(@Param('todoId') todoId: string, @Body() todo: Todo): Promise<{message: string, result: Todo}> {
        return this.todosService.updateTodo(todoId, todo);
    };
    
    // Delete a todo
    @Delete(':todoId')
    deleteTodo(@Param('todoId') todoId: string): Promise<{status: Boolean, message: string}> {
        return this.todosService.deleteTodo(todoId);
    };
};
