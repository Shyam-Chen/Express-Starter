import { Router } from 'express';

import { List } from '../models';

const router = Router();

router.get('/', (req, res) => {
  res.render('index.html');
});

router.get('/list', (req, res, next) => {
  List.find({}, (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

export const route = router;
