import { Router } from 'express';

// import service from './service';

const controller = (() => {
  const router = Router();

  router.ws('/', (ws) => {
    ws.on('message', (msg) => {
      console.log(msg);
    });
  });

  return router;
})();

controller.prefix = '/realtime-data';

export default controller;
