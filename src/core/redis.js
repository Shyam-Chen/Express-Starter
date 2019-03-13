import Redis from 'ioredis';
import chalk from 'chalk';

import { REDIS_URL } from '~/env';

const redis = new Redis(REDIS_URL);

redis.on('connect', () => console.log(chalk.hex('#009688')(' [*] Redis: Connection Succeeded.')));
redis.on('error', err => console.error(err));

export default redis;
