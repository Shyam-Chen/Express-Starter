import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('index.html');
});

export const routes = router;
export * from './list';
