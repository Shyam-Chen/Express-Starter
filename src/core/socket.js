// @flow

import socket from 'socket.io';
import socketRedis from 'socket.io-redis';
import chalk from 'chalk';

import { REDIS_PORT, REDIS_HOST } from '~/env';
import server from '~/api';

export const io = socket.listen(server);

io.origins(['*:*']);
io.adapter(socketRedis({ host: REDIS_HOST, port: REDIS_PORT }));

io.on('connection', (connSocket): void => {
  console.log(chalk.hex('#009688')(' [*] Socket: Connection Succeeded.'));
  connSocket.on('disconnect', () => console.log(chalk.hex('#009688')(' [*] Socket: Disconnected.')));
});
