import * as path from 'path';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppLogger } from './logger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new AppLogger(),
    });

    app.use(express.static(path.join(__dirname, '../frontend')));

    const options = new DocumentBuilder()
        .setTitle('Nestjs App Skeleton')
        .setDescription('Nestjs App Skeleton API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
