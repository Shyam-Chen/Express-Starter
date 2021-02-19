import { Router } from 'express';
import enableWs from '@small-tech/express-ws';

// import service from './service';

const controller = (() => {
  const router = Router();
  enableWs(router);

  /**
   * const client = new WebSocket('ws://localhost:3000/realtime-data/echo');
   *
   * client.on('open', () => {
   *   client.send('Hello, RealtimeData!');
   * });
   *
   * client.onmessage = event => {
   *   console.log(event.data);
   * };
   */
  router.ws('/echo', ws => {
    ws.on('message', msg => {
      ws.send(msg);
    });
  });

  return router;
})();

controller.prefix = '/realtime-data';

export default controller;
