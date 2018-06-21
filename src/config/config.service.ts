import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { toNumber } from 'lodash';

import { Symbols } from '../constants';
import { ConfigItem } from './config-item.type';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [prop in ConfigItem]: string };

    constructor(@Inject(Symbols.ConfigPath) filePath: string) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    public get(key: ConfigItem): string {
        return this.envConfig[key];
    }

    public getNumber(key: ConfigItem): number {
        return toNumber(this.get(key));
    }

    public getAgendaConfig(): object {
        return {
            db: {
                address: this.get(ConfigItem.AGENDA_URL),
                collection: this.get(ConfigItem.AGENDA_COLLECTION),
            },
        };
    }
}
