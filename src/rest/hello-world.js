// @flow

import type { $Request, $Response } from 'express';
import { Router } from 'express';

const router: Router = Router();

/**
 * @return {string}
 *
 * @example GET /api/hello-world
 */
router.get('/', (req: $Request, res: $Response): void => {
  res.status(200).send('Hello, World!');
});

export default router;
