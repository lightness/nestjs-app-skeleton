import {
    Controller,
    FileInterceptor,
    Get,
    Post,
    Req,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { inspect } from 'util';
import { Logger } from 'winston';

import { AppService } from './app.service';
import { ConfigItem } from './config/config-item.type';
import { ConfigService } from './config/config.service';
import { Paths } from './constants';
import { getEnv } from './env';
import { AppLogger } from './logger';
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
    public async root(): Promise<string> {
        this.logger.warn('Ololo');

        return (
            getEnv() +
            this.configService.get(ConfigItem.DB_HOST) +
            JSON.stringify(await this.todoService.findAll())
        );
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', { dest: Paths.UploadDir }))
    public async upload(@UploadedFile() file) {
        this.logger.debug(inspect(file));
    }
}
