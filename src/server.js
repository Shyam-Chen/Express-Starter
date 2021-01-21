import chalk from 'chalk';

import apolloServer from '~/core/graphql';
import mongoose from '~/core/mongoose';
import sequelize from '~/core/sequelize';
import redis from '~/core/redis';

import { PORT, HOST } from './env';
import app from './app';

const teal500 = chalk.hex('#009688');

app.listen(Number(PORT), HOST, () => {
  console.log(teal500('🚀  App: Bootstrap Succeeded'));
  console.log(teal500(`🚀  Host: http://${HOST}:${PORT}`));
  console.log(teal500(`🚀  GraphQL: http://${HOST}:${PORT}${apolloServer.graphqlPath}`));

  mongoose.connection
    .once('open', () => console.log(teal500('🚀  MongoDB: Connection Succeeded')))
    .on('error', err => console.error(err));

  sequelize
    .authenticate()
    .then(() => console.log(teal500('🚀  PostgreSQL: Connection Succeeded')))
    .catch(err => console.error(err));

  redis.on('connect', () => {
    console.log(teal500('🚀  Redis: Connection Succeeded'));
  });
});
