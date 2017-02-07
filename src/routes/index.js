import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Backend Starter Kit');
});

export const route = router;
