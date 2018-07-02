import { Router } from 'express';

import { io } from '~/core/socket';

const router = Router();

// TODO: real-time

router.get('/', () => {
  io.emit('message', { key: 'foo' });
});

export default router;
