import { Sequelize } from 'sequelize-typescript';

import { ConfigItem } from '../config/config-item.type';
import { ConfigService } from '../config/config.service';
import { Symbols } from '../constants';
import { getEnv, Env } from '../env';
import { AppLogger } from '../logger';

export const databaseProviders = [
    {
        provide: Symbols.Sequelize,
        useFactory: async (configService: ConfigService) => {
            const env: Env = getEnv();
            const logger = AppLogger.getLogger();

            const sequelize = new Sequelize({
                dialect: configService.get(ConfigItem.DB_DIALECT),
                storage: configService.get(ConfigItem.DB_STORAGE),
                host: configService.get(ConfigItem.DB_HOST),
                port: configService.getNumber(ConfigItem.DB_PORT),
                username: configService.get(ConfigItem.DB_USER),
                password: configService.get(ConfigItem.DB_PASSWORD),
                database: configService.get(ConfigItem.DB_DATABASE),
                logging: env === Env.DEV ? msg => logger.debug(msg) : false,
                operatorsAliases: false,
                modelPaths: [__dirname + '/../**/*.model.ts', __dirname + '/../**/*.model.js'],
            });

            // Alternative way to register models
            // sequelize.addModels([Todo]);

            if (env === Env.DEV) {
                await sequelize.sync({ force: true });
            }

            console.warn('>>> Sequelize ready');

            return sequelize;
        },
        inject: [ConfigService],
    },
];
