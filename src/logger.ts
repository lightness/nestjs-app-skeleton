import * as fs from 'fs';
import * as _ from 'lodash';
import * as moment from 'moment';
import { MESSAGE } from 'triple-beam';
import { LoggerService } from '@nestjs/common';
import { Format, TransformableInfo } from 'logform';
import { createLogger, format, transports, Logger, addColors } from 'winston';

const { combine, colorize, prettyPrint } = format;

export class AppLogger implements LoggerService {
    private static _logger: Logger;

    public static getLogger(): Logger {
        if (!AppLogger._logger) {
            AppLogger._logger = createLogger({
                transports: [
                    new transports.Console({
                        level: 'debug',
                        format: combine(colorize(), this.formatter()),
                    }),
                    new transports.Stream({
                        stream: fs.createWriteStream('logs/full.log', {
                            flags: 'a',
                        }),
                        format: this.formatter(),
                    }),
                    new transports.Stream({
                        level: 'error',
                        stream: fs.createWriteStream('logs/error.log', {
                            flags: 'a',
                        }),
                        format: this.formatter(),
                    }),
                ],
            });
        }

        return AppLogger._logger;
    }

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
