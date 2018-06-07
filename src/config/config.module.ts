import { Module, Global } from '@nestjs/common';

import { getEnv } from '../env';
import { ConfigService } from './config.service';

@Global()
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
