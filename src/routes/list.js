import { Router } from 'express';

import { List } from '../models';

const router = Router();

router.get('/', async (req, res, next) => {
  const data = {};
  const { text } = req.query;

  if (text) {
    data['text'] = {
      $regex: text,
      $options: 'i'
    };
  }

  List.find(data, (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

router.get('/:id', async (req, res) => {
  const data = await List.findById(req.params.id).exec();
  res.json(data);
});

router.post('/', async (req, res, next) => {
  const list = new List(req.body);

  list.save(err => {
    if (err) return next(err);
    res.json({ message: 'List saved' });
  });
});

router.put('/:id', async (req, res, next) => {
  List.findById(req.params.id, (err, data) => {
    if (err) return next(err);

    for (let prop in req.body) {
      if (req.body) data[prop] = req.body[prop];
    }

    data.save(err => {
      if (err) return next(err);
      res.json({ message: 'List updated' });
    });
  });
});

router.delete('/:id', async (req, res, next) => {
  List.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.json({ message: 'List deleted' });
  });
});

export const listRoutes = router;
