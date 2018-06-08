import { Sequelize } from 'sequelize-typescript';

import { ConfigService } from '../config/config.service';
import { ConfigItem } from '../config/config-item.type';
import { Symbols } from '../constants';
import { AppLogger } from '../logger';
import { getEnv, Env } from '../env';

export const databaseProviders = [
    {
        provide: Symbols.Sequelize,
        useFactory: async (configService: ConfigService) => {
            const logger = AppLogger.getLogger();

            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: configService.get(ConfigItem.DB_HOST),
                port: configService.getNumber(ConfigItem.DB_PORT),
                username: configService.get(ConfigItem.DB_USER),
                password: configService.get(ConfigItem.DB_PASSWORD),
                database: configService.get(ConfigItem.DB_DATABASE),
                logging: msg => logger.debug(msg),
                modelPaths: [
                    __dirname + '/../**/*.model.ts',
                    __dirname + '/../**/*.model.js',
                ],
            });

            // Alternative way to register models
            // sequelize.addModels([Todo]);

            const env: Env = getEnv();

            if (env === Env.DEV) {
                await sequelize.sync({ force: true });
            }

            return sequelize;
        },
        inject: [ConfigService],
    },
];
