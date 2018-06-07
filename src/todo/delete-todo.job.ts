import { Injectable } from '@nestjs/common';

import { JobBase, Job } from '../agenda/job-base';
import { AgendaService } from '../agenda/agenda.service';
import { TodoService } from './todo.service';

@Injectable()
@Job({ name: 'delete job', every: '1 seconds', lockLifetime: 5000 })
export class DeleteTodoJob extends JobBase {
    public constructor(
        protected readonly agendaService: AgendaService,
        protected readonly todoService: TodoService,
    ) {
        super(agendaService);
    }

    public async handle() {
        console.warn('>>> delete XXX', (await this.todoService.findAll()).map(x => x.toJSON()));
    }
}
