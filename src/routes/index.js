import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('index.html');
});

// router.post('/auth', (req, res, next) => {
//
// });

export const routes = router;
export * from './list';
