import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';

@Module({
    imports: [ConfigModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
