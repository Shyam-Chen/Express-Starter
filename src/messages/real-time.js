import { Router } from 'express';

const router = Router();

/**
 * @example GET /messages/real-time
 */
router.get('/', (req, res) => {
  req.app.get('socket').on('connection', connSocket => {
    connSocket.emit('A', { foo: 'bar' });
    connSocket.on('B', data => console.log(data)); // { foo: 'baz' }
  });

  res.json({ message: 'Trigger connections' });
});

export default router;
