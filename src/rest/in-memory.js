import { Router } from 'express';

import { client } from '~/config/redis';

const router = Router();

// TODO: in-memory

router.get('/', (req, res) => {
  client.get('autocomplete', (err, reply) => {
    res.json(reply);
  });
});

router.post('/', (req, res) => {
  client.set('autocomplete', req.body.field);
  res.json({ message: 'OK' });
});

export default router;
