import { Module } from '@nestjs/common';

import Todo from './todo.model';
import { Symbols } from '../constants';
import { TodoService } from './todo.service';
import { DeleteTodoJob } from './delete-todo.job';
import { AgendaModule } from '../agenda/agenda.module';

@Module({
    imports: [AgendaModule],
    providers: [
        TodoService,
        { provide: Symbols.Repository.Todo, useValue: Todo },
        DeleteTodoJob,
    ],
    exports: [TodoService],
})
export class TodoModule {}
