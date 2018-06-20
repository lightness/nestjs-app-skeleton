import { DynamicModule, Module, Type } from '@nestjs/common';

import { AgendaService } from './agenda.service';

@Module({
    providers: [AgendaService],
    exports: [AgendaService],
})
export class AgendaModule {}
