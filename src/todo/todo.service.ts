import { Injectable, Inject } from '@nestjs/common';
import { ValidationError } from 'sequelize';

import Todo from './todo.model';
import { Symbols } from '../constants';
import { AppLogger } from '../logger';
import { ConfigService } from '../config/config.service';

@Injectable()
export class TodoService {
    private logger = AppLogger.getLogger();

    public constructor(
        @Inject(Symbols.Repository.Todo)
        private readonly todoRepository: typeof Todo,
        private readonly configService: ConfigService,
    ) {}

    public async findAll(): Promise<Todo[]> {
        try {
            await this.todoRepository.create({ title: 'x', text: 'a' });
        } catch (e) {
            this.logger.warn(`${e instanceof ValidationError}`);
        }

        return await this.todoRepository.findAll<Todo>();
    }
}
