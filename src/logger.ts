import { LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as moment from 'moment';
import * as path from 'path';
import { MESSAGE } from 'triple-beam';
import { createLogger, format, transports, Logger } from 'winston';

const { combine, colorize } = format;

export class AppLogger implements LoggerService {
    public static getLogger(): Logger {
        if (!AppLogger.logger) {
            const LOGS_DIR = 'logs';

            if (!fs.existsSync(LOGS_DIR)) {
                fs.mkdirSync(LOGS_DIR);
            }

            AppLogger.logger = createLogger({
                transports: [
                    new transports.Console({
                        format: combine(colorize(), this.formatter()),
                        level: 'debug',
                    }),
                    new transports.Stream({
                        format: this.formatter(),
                        stream: fs.createWriteStream(path.join(LOGS_DIR, 'full.log'), { flags: 'a' }),
                    }),
                    new transports.Stream({
                        format: this.formatter(),
                        level: 'error',
                        stream: fs.createWriteStream(path.join(LOGS_DIR, 'error.log'), { flags: 'a' }),
                    }),
                ],
            });
        }

        return AppLogger.logger;
    }

    private static logger: Logger;

    private static formatter = format((info, opts) => {
        const timestamp = moment().format('DD-MM-YYYY hh:mm:ss.SSS');

        info[MESSAGE] = `[${timestamp}] ${info.level}: ${info.message}`;

        return info;
    });

    private logger: Logger;

    public constructor() {
        this.logger = AppLogger.getLogger();
    }

    public log(message: string) {
        this.logger.info(message);
    }

    public error(message: string, trace: string) {
        this.logger.error(trace);
    }

    public warn(message: string) {
        this.logger.warn(message);
    }
}
