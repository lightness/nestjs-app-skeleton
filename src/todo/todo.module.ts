import { Module } from '@nestjs/common';

import Todo from './todo.model';
import { Symbols } from '../constants';
import { TodoService } from './todo.service';
import { DeleteTodoJob } from './delete-todo.job';
import { AgendaModule } from '../agenda/agenda.module';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [AgendaModule, DatabaseModule],
    providers: [
        { provide: Symbols.Repository.Todo, useFactory: () => Todo, inject: [Symbols.Sequelize] },
        TodoService,
        DeleteTodoJob,
    ],
    exports: [TodoService],
})
export class TodoModule {}
