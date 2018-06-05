import { Get, Controller } from '@nestjs/common';
import { Logger } from 'winston';

import { getEnv } from './env';
import { AppLogger } from './logger';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { ConfigItem } from './config/config-item.type';
import { TodoService } from './todo/todo.service';

@Controller()
export class AppController {
    private logger: Logger = AppLogger.getLogger();

    constructor(
        private readonly appService: AppService,
        private readonly configService: ConfigService,
        private readonly todoService: TodoService,
    ) {}

    @Get()
    async root(): Promise<string> {
        this.logger.warn('Ololo');

        // throw new Error('hello error');
        // return this.appService.root();

        return getEnv() + this.configService.get(ConfigItem.DB_HOST) + JSON.stringify(await this.todoService.findAll());
    }
}
