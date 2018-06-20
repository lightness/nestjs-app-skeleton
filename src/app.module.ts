import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './todo/todo.module';

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        TodoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
