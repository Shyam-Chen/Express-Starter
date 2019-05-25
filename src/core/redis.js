import Redis from 'ioredis';

import { REDIS_URL } from '~/env';

const redis = new Redis(REDIS_URL);

export default redis;
