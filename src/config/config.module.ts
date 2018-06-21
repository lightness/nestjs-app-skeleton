import { Global, Module } from '@nestjs/common';

import { Symbols } from '../constants';
import { getEnv } from '../env';
import { ConfigService } from './config.service';

@Global()
@Module({
    providers: [
        { provide: Symbols.ConfigPath, useValue: `config/${getEnv()}.env` },
        ConfigService,
    ],
    exports: [ConfigService],
})
export class ConfigModule {}
