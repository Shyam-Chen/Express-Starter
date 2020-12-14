import http from 'http';
import socket from 'socket.io';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import chalk from 'chalk';

import apolloServer, { schema } from '~/core/graphql';
import mongoose from '~/core/mongoose';
import sequelize from '~/core/sequelize';

import { PORT, HOST } from './env';
import app from './app';

const server = http.Server(app);
const io = socket(server);
const teal500 = chalk.hex('#009688');

app.set('socket', io);
io.origins(['*:*']);
apolloServer.installSubscriptionHandlers(server);

server.listen(Number(PORT), HOST, () => {
  console.log(teal500('🚀  App: Bootstrap Succeeded'));
  console.log(teal500(`🚀  Host: http://${HOST}:${PORT}`));
  console.log(teal500(`🚀  GraphQL: http://${HOST}:${PORT}${apolloServer.graphqlPath}`));

  mongoose.connection
    .once('open', () => console.log(teal500('🚀 Mongo: Connection Succeeded.')))
    .on('error', err => console.error(err));

  sequelize
    .authenticate()
    .then(() => console.log(teal500('🚀 Postgres: Connection Succeeded.')))
    .catch(err => console.error(err));
});

io.on('connection', connSocket => {
  console.log(teal500('🚀 Socket: Connection Succeeded.'));
  connSocket.on('disconnect', () => console.log(teal500('🚀 Socket: Disconnected.')));
});

SubscriptionServer.create({ execute, subscribe, schema }, { server, path: '/graphql' });
