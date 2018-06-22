import { Module } from '@nestjs/common';

import { AgendaModule } from '../agenda/agenda.module';
import { Symbols } from '../constants';
import { DatabaseModule } from '../database/database.module';
import { DeleteTodoJob } from './delete-todo.job';
import Todo from './todo.model';
import { TodoService } from './todo.service';

@Module({
    imports: [AgendaModule, DatabaseModule],
    providers: [
        { provide: Symbols.Repository.Todo, useValue: Todo },
        TodoService,
        DeleteTodoJob,
    ],
    exports: [TodoService],
})
export class TodoModule {}
