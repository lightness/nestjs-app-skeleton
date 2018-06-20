import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from 'sequelize';

import { Symbols } from '../constants';
import { AppLogger } from '../logger';
import Todo from './todo.model';

@Injectable()
export class TodoService {
    private logger = AppLogger.getLogger();

    public constructor(
        @Inject(Symbols.Repository.Todo)
        private readonly todoRepository: typeof Todo,
    ) {}

    public async findAll(): Promise<Todo[]> {
        try {
            await this.todoRepository.create({ title: 'x', text: 'aqwe' });
        } catch (e) {
            this.logger.warn(`${e instanceof ValidationError}`);
        }

        return await this.todoRepository.findAll<Todo>();
    }
}
