import { Router } from 'express';

import service from './service';

const controller = (() => {
  const router = Router();

  /**
   * POST /hello-world { data?: any }
   * @example http POST :3000/hello-world
   * @example http POST :3000/hello-world data=Express
   */
  router.post('/', (req, res) => {
    res.json({ data: service.sayHello(req.body.data) });
  });

  return router;
})();

controller.prefix = '/hello-world';

export default controller;
