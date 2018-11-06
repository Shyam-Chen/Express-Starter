// @flow

import { Router, $Request, $Response } from 'express';

const router: Router = Router();

/**
 * @return {string}
 *
 * @example GET /__/hello-world
 */
router.get('/', (req: $Request, res: $Response): void => {
  res.status(200).send('Hello, World!');
});

export default router;
