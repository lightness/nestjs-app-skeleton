import { Injectable, Inject } from '@nestjs/common';

import Todo from './todo.model';
import { Symbols } from '../constants';

@Injectable()
export class TodoService {
    public constructor(
        @Inject(Symbols.Repository.Todo) private readonly todoRepository: typeof Todo,
    ) {}

    public async findAll(): Promise<Todo[]> {
        return await this.todoRepository.findAll<Todo>();
    }
}
