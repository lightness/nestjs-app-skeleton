import { Sequelize } from 'sequelize-typescript';

import { ConfigService } from '../config/config.service';
import { ConfigItem } from '../config/config-item.type';

export const databaseProviders = [
    {
        provide: 'SequelizeToken', // TODO: Try with `Sequelize`
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: configService.get(ConfigItem.DB_HOST),
                port: configService.getNumber(ConfigItem.DB_PORT),
                username: configService.get(ConfigItem.DB_USER),
                password: configService.get(ConfigItem.DB_PASSWORD),
                database: configService.get(ConfigItem.DB_DATABASE),
                logging: console.log, // TODO: Use winston logger with `debug` level
            });

            // sequelize.addModels([Cat]);

            await sequelize.sync();

            return sequelize;
        },
        inject: [ConfigService],
    },
];
