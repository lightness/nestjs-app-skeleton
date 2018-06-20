import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as _ from 'lodash';

import { ConfigItem } from './config-item.type';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [prop in ConfigItem]: string };

    constructor(filePath: string) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    public get(key: ConfigItem): string {
        return this.envConfig[key];
    }

    public getNumber(key: ConfigItem): number {
        return _.toNumber(this.get(key));
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
