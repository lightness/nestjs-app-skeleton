import { ReflectMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AgendaService } from './agenda.service';

const JOB_PARAMS_META_KEY = 'job';

interface JobOptions {
    name: string;
    every: string;
    lockLifetime: number;
}

export const Job = (options: JobOptions) => ReflectMetadata(JOB_PARAMS_META_KEY, options);

export abstract class JobBase {
    public constructor(protected readonly agendaService: AgendaService) {
        this.init();
    }

    protected abstract handle(job?: any, done?: () => void): void;

    private init() {
        const reflector = new Reflector();
        const options: JobOptions = reflector.get<JobOptions>(JOB_PARAMS_META_KEY, this.constructor);

        this.agendaService.defineJob(options.name, options.lockLifetime, this.handle.bind(this));
        this.agendaService.runJob(options.name, options.every);
    }
}
