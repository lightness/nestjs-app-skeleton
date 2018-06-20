import { Injectable } from '@nestjs/common';
import * as Agenda from 'agenda';
import * as _ from 'lodash';
import { Logger } from 'winston';

import { ConfigService } from '../config/config.service';
import { AppLogger } from '../logger';

@Injectable()
export class AgendaService {
    private status: { isReady: boolean } = { isReady: false };
    private deferredJobs: { jobName: string; when: string }[] = [];
    private logger: Logger = AppLogger.getLogger();

    private agenda: Agenda;

    public constructor(private readonly configService: ConfigService) {
        this.agenda = new Agenda(this.configService.getAgendaConfig());

        this.agenda.on('ready', () => this.onReady());

        process.on('SIGTERM', this.gracefulStop.bind(this));
        process.on('SIGINT', this.gracefulStop.bind(this));
    }

    public defineJob(
        jobName: string,
        lockLifetime: number,
        handler: (job, done?) => void,
    ) {
        this.agenda.define(jobName, { lockLifetime }, handler);
    }

    public runJob(jobName: string, when: string) {
        if (!this.status.isReady) {
            this.deferredJobs.push({ jobName, when });
        } else {
            this.agenda.every(when, jobName);
        }
    }

    private gracefulStop() {
        this.logger.info('Agenda was stopped gracefully');
        this.agenda.stop(() => {
            process.exit(0);
        });
    }

    private onReady() {
        this.status.isReady = true;

        _.each(this.deferredJobs, job => {
            this.agenda.every(job.when, job.jobName);
        });

        this.agenda.start();
    }

}
