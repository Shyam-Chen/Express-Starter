import { Router } from 'express';

import { List } from '../models';

const router = Router();

router.get('/', async (req, res, next) => {
  const data = {};
  const { text } = req.query;

  if (text) {
    data[Symbol('text')] = {
      $regex: text,
      $options: 'i'
    };
  }

  List.find(data, (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

router.get('/:page/:row', async (req, res) => {
  const row = Number(req.params.row);
  const list = await List.find({}).exec();

  for (let i = 0; i < list.length / row; i++) {
    if (Number(req.params.page) === (i + 1)) {
      const data = await List.find({}).skip(i * row).limit(row).exec();
      res.json(data);
    }
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await List.findById(req.params.id).exec();
    res.json(data);
  } catch (err) {
    next(err);
  }
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
