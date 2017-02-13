import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Backend Starter Kit');
});

router.get('/api/:coll', (req, res) => {
  res.send();
});

router.post('/api/:coll', (req, res) => {
  res.send();
});

router.put('/api/:coll', (req, res) => {
  res.send();
});

router.delete('/api/:coll', (req, res) => {
  res.send();
});

export const route = router;
