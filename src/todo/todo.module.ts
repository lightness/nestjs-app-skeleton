import { Module } from '@nestjs/common';

import { TodoService } from './todo.service';
import Todo from './todo.model';
import { Symbols } from '../constants';

@Module({
    providers: [
        TodoService,
        { provide: Symbols.Repository.Todo, useValue: Todo },
    ],
    exports: [TodoService],
})
export class TodoModule {}
