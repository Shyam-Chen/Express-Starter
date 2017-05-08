import { Router } from 'express';

import { List } from '../models';

const router = Router();

router.get('/', (req, res, next) => {
  List.find({}, (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

router.get('/:text', (req, res, next) => {
  const list = new List({
    text: req.params.text,
    created: new Date()
  });

  list.save(err => {
    if (err) return next(err);
    console.log('List saved successfully.');
    res.redirect('/list');
  });
});

export const listRoutes = router;
