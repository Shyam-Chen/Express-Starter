import { Router } from 'express';
import { Op } from 'sequelize';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { List } from '~/document';
import relational from '~/relational';

const router = Router();

/**
 * @name Mongo
 */

/**
 * @name list - get a list
 * @param {string} [_id] - get a item by ID
 * @param {string} [text] - search for text in list
 * @return {Object<{ data: List[], message: string }>}
 *
 * @example GET /__/text-list
 * @example GET /__/text-list?_id=${_id}
 * @example GET /__/text-list?text=${text}
 */
router.get('/', async (req, res, next) => {
  try {
    const { _id, text } = req.query;

    const find = {};

    if (_id) find._id = { _id };
    if (text) find.text = { $regex: text, $options: 'i' };

    const data = await List.find(find).exec();

    res.json({ data, message: 'Data obtained.' });
  } catch (err) {
    next(err);
  }
});

/**
 * @name count - get a list length
 * @return {Object<{ data: number, message: string }>}
 *
 * @example GET /__/text-list/count
 */
router.get('/count', (req, res, next) => {
  from(List.count().exec())
    .pipe(catchError(err => next(err)))
    .subscribe(data => res.json({ data, message: 'Data obtained.' }));
});

/**
 * @name pagination - get a list of paging
 * @param {number} [page=1] - current page number
 * @param {number} [row=5] - rows per page
 * @return {Object<{ data: List[], message: string }>}
 *
 * @example GET /__/text-list/pagination?page=${page}&row=${row}
 */
router.get('/pagination', async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const row = Number(req.query.row) || 5;

    const list = await List.find({}).exec();
    const data = [];

    for (let i = 0, l = list.length; i < l / row; i++) {
      if (page === (i + 1)) {
        data.push(List.find({}).skip(i * row).limit(row));
      }
    }

    res.json({ data: await Promise.all(data), message: 'Data obtained.' });
  } catch (err) {
    next(err);
  }
});

/**
 * @name create - create a item
 * @return {Object<{ message: string }>}
 *
 * @example POST /__/text-list { text: ${text} }
 */
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.text) {
      res.status(400)
        .json({ message: 'Please pass text.' });
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
 * @return {Object<{ message: string }>}
 *
 * @example PUT /__/text-list/${id}
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
 * @return {Object<{ message: string }>}
 *
 * @example DELETE /__/text-list/${id}
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
 * @name delete-many - remove multiple items
 */
// TODO: delete multiple items through conditions

/**
 * @name Postgre
 */

/**
 * @name list - get a list
 * @param {string} [text] - search for text in list
 * @return {Object<{ data: List[] }>}
 *
 * @example GET /__/text-list/relational
 * @example GET /__/text-list/relational?text=${text}
 */
router.get('/relational', async (req, res, next) => {
  try {
    // TODO: get a item with ID
    const { text } = req.query;

    const find = {};

    if (text) {
      find.where = {
        text: {
          [Op.like]: `%${text}%`,
        },
      };
    }

    const data = await relational.List.findAll(find);
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

/**
 * @name count - get a list length
 * @return {Object<{ data: number }>}
 *
 * @example GET /__/text-list/relational/count
 */
router.get('/relational/count', async (req, res, next) => {
  try {
    const data = await relational.List.count();
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

/**
 * @name pagination - get a list of paging
 */
router.get('/relational/pagination', (req, res, next) => {
  try {
    // TODO: pagination
  } catch (err) {
    next(err);
  }
});

/**
 * @name create - create a item
 * @return {Object<{ message: string }>}
 *
 * @example POST /__/text-list/relational { text: ${text} }
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
 * @name update - update a item
 */
router.put('/relational/:id', async (req, res, next) => {
  try {
    const message = await relational.List
      .update(
        // TODO: update
        { updatedAt: req.body },
        { where: { id: req.params.id } },
      )
      .then(() => 'List saved');

    res.json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @name delete - remove a item
 * @return {Object<{ message: string }>}
 *
 * @example DELETE /__/text-list/relational/${id}
 */
router.delete('/relational/:id', async (req, res, next) => {
  try {
    const message = await relational.List
      .destroy({ where: { id: req.params.id } })
      .then(() => 'List deleted');

    res.json({ message });
  } catch (err) {
    next(err);
  }
});

export default router;
