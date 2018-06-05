import { Module } from '@nestjs/common';

import { getEnv } from '../env';
import { ConfigService } from './config.service';

@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`config/${getEnv()}.env`),
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule {}
