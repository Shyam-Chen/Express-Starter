import { Router } from 'express';

import { List } from '~/document';
import relational from '~/relational';

const router = Router();

/**
 * @name Mongo
 */

/**
 * @name list - get a list
 * @param {string} _id - get a item by ID
 * @param {string} text - search for text in list
 * @return {Array<List>}
 *
 * @example GET /__/list
 * @example GET /__/list?_id=${_id}
 * @example GET /__/list?text=${text}
 */
router.get('/', async (req, res, next) => {
  try {
    const { _id, text } = req.query;
    const find = {};

    if (_id) find._id = { _id };
    if (text) find.text = { $regex: text, $options: 'i' };

    const data = await List.find(find).exec();

    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * @name count - get a list length
 * @return {number}
 *
 * @example GET /__/list/count
 */
router.get('/count', async (req, res, next) => {
  try {
    const data = await List.count().exec();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * @name pagination - get a list of paging
 * @param {number} page - current page number
 * @param {number} row - rows per page
 * @return {Array<List>}
 *
 * @example GET /__/list/pagination/${page}/${row}
 */
router.get('/pagination/:page/:row', async (req, res, next) => {
  try {
    const row = Number(req.params.row);
    const list = await List.find({}).exec();
    const data = [];

    for (let i = 0, l = list.length; i < l / row; i++) {
      if (Number(req.params.page) === (i + 1)) {
        data.push(List.find({}).skip(i * row).limit(row));
      }
    }

    res.json(await Promise.all(data));
  } catch (err) {
    next(err);
  }
});

/**
 * @name create - create a item
 *
 * @example POST /__/list
 */
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.text) {
      res.status(400);
      res.json({ message: 'Please pass text.' });
      return;
    }

    const list = await new List(req.body);
    const message = await list.save().then(() => 'List saved');

    res.json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @name update - update a item
 *
 * @example PUT /__/list/${id}
 */
router.put('/:id', async (req, res, next) => {
  try {
    const message = await List
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(() => 'List updated');

    res.json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @name delete - remove a item
 *
 * @example DELETE /__/list/${id}
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const message = await List
      .findByIdAndRemove(req.params.id)
      .then(() => 'List deleted');

    res.json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @name delete-many
 */
// router.delete('/', () => {
//   List.deleteMany({ isCheck: true }).then(() => 'List deleted');
// });

/**
 * @name Postgre
 */

/**
 * @name create - create a item
 */
router.post('/relational', async (req, res, next) => {
  try {
    const message = await relational.List
      .create(req.body)
      .then(() => 'List saved');

    res.json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @name list - get a list
 */
router.get('/relational', async (req, res, next) => {
  try {
    const data = await relational.List.findAll();
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

router.delete('/relational/:id', async (req, res, next) => {
  try {
    const message = await relational.List
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(() => 'List deleted');

    res.json({ message });
  } catch (err) {
    next(err);
  }
});

export default router;
