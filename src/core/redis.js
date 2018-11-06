// @flow

import redis from 'redis';
import chalk from 'chalk';

import { REDIS_PORT, REDIS_HOST } from '~/env';

export const client = redis.createClient(REDIS_PORT, REDIS_HOST);  // eslint-disable-line

client.on('connect', () => console.log(chalk.hex('#009688')(' [*] Redis: Connection Succeeded.')));
client.on('error', err => console.error(err));
