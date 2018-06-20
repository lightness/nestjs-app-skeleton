import _ from 'lodash';

export enum Env {
    DEV = 'dev',
    TEST = 'test',
    STAGING = 'staging',
    PRODUCTION = 'production',
}

export function getEnv(): Env {
    const nodeEnv: string = process.env.NODE_ENV;

    const isCorrectNodeEnv: boolean = nodeEnv
        ? _(Env)
              .values()
              .includes(nodeEnv)
        : true;

    if (!isCorrectNodeEnv) {
        throw new Error(`NODE_ENV contains wrong value: "${nodeEnv}"`);
    }

    return (nodeEnv as Env) || Env.DEV;
}
