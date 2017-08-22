import { Router } from 'express';

import { List } from '~/models';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const find = {};
    const { text } = req.query;

    if (text) {
      find['text'] = {
        $regex: text,
        $options: 'i'
      };
    }

    const data = await List.find(find).exec();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/:page/:row', async (req, res, next) => {
  try {
    const row = Number(req.params.row);
    const list = await List.find({}).exec();

    for (let i = 0; i < list.length / row; i++) {
      if (Number(req.params.page) === (i + 1)) {
        const data = await List.find({}).skip(i * row).limit(row).exec();
        res.json(data);
      }
    }
  } catch (err) {
    next(err);
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
  try {
    const list = await new List(req.body);
    const message = await list.save().then(() => 'List saved');
    res.json({ message });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id).exec();

    for (let prop in req.body) {
      if (req.body) list[prop] = req.body[prop];
    }

    const message = await list.save().then(() => 'List updated');
    res.json({ message });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const message = await List.findByIdAndRemove(req.params.id).then(() => 'List deleted');
    res.json({ message });
  } catch (err) {
    next(err);
  }
});

export const listRoutes = router;
