import { Router } from 'express';

const router = Router();

/**
 * @example GET /__/hello-world
 */
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default router;
