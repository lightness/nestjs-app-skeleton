import { ReflectMetadata } from '@nestjs/common';

export const X = (...args: string[]) => ReflectMetadata('x', args);
