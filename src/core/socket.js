import socket from 'socket.io';
import chalk from 'chalk';

import server from '~/api';

export const io = socket.listen(server);

io.origins(['*:*']);

io.on('connection', (connSocket) => {
  console.log(chalk.hex('#009688')(' [*] Socket: Connection Succeeded.'));
  connSocket.on('disconnect', () => console.log(chalk.hex('#009688')(' [*] Socket: Disconnected.')));
});
