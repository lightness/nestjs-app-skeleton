import { Get, Controller } from '@nestjs/common';
import { Logger } from 'winston';
import { AppLogger } from 'logger';

import { AppService } from './app.service';

@Controller()
export class AppController {
    private logger: Logger = AppLogger.getLogger();

    constructor(private readonly appService: AppService) {}

    @Get()
    root(): string {
        this.logger.warn('Ololo');

        throw new Error('hello error');
        return this.appService.root();
    }
}
