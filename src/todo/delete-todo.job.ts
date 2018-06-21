import { Injectable } from '@nestjs/common';

import { AgendaService } from '../agenda/agenda.service';
import { Job, JobBase } from '../agenda/job-base';
import { TodoService } from './todo.service';

@Injectable()
@Job({ name: 'delete job', every: '1 minutes', lockLifetime: 5000 })
export class DeleteTodoJob extends JobBase {
    public constructor(protected readonly agendaService: AgendaService, protected readonly todoService: TodoService) {
        super(agendaService);
    }

    public async handle() {
        console.warn('>>> delete XXX', (await this.todoService.findAll()).map(x => x.toJSON()));
    }
}
