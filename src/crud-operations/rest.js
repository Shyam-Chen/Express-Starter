import { Router } from 'express';
import { Op } from 'sequelize';
import { from } from 'rxjs';
import request from 'request-promise';

import { List } from './document';
import { RelationalList } from './relational';

const router = Router();

/**
 * @name list - get a list
 * @param {string} [_id] - get a item by ID
 * @param {string} [text] - search for text in list
 * @return {Object<{ data: List[], message: string }>}
 *
 * @example GET /__/crud-operations
 * @example GET /__/crud-operations?_id=${_id}
 * @example GET /__/crud-operations?text=${text}
 */
router.get('/', async (req, res) => {
  const { _id, text } = req.query;

  const find = {};

  if (_id) find._id = _id;
  if (text) find.text = { $regex: text, $options: 'i' };

  const data = await List.find(find).exec();

  res.json({ data, message: 'Data obtained.' });
});

/**
 * @name item - get a item
 * @param {string} id - get a item by ID
 * @return {Object<{ data: List[], message: string }>}
 *
 * @example GET /__/crud-operations/${id}
 */
router.get('/item/:id', (req, res) => {
  from(List.find({ _id: req.params.id }).exec())
    .subscribe(data => res.json({ data, message: 'Data obtained.' }));
});

/**
 * @name count - get a list length
 * @return {Object<{ data: number, message: string }>}
 *
 * @example GET /__/crud-operations/count
 */
router.get('/count', (req, res) => {
  from(List.count().exec())
    .subscribe(data => res.json({ data, message: 'Data obtained.' }));
});

/**
 * @name pagination - get a list of paging
 * @param {number} [page=1] - current page number
 * @param {number} [row=5] - rows per page
 * @return {Object<{ data: List[], message: string }>}
 *
 * @example GET /__/crud-operations/pagination?page=${page}&row=${row}
 */
router.get('/pagination', async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

  const data = [];

  const page = Number(req.query.page) || 1;
  const row = Number(req.query.row) || 5;
  const count = await request(`${baseUrl}/count`);
  const total = JSON.parse(count).data;

  for (let i = 0, l = total; i < l / row; i++) {
    if (page === (i + 1)) {
      data.push(List.find({}).skip(i * row).limit(row));
    }
  }

  res.json({
    data: [...await Promise.all(data)],
    total,
    message: 'Data obtained.',
  });
});

/**
 * @name create - create a item
 * @return {Object<{ message: string }>}
 *
 * @example POST /__/crud-operations { text: ${text} }
 */
router.post('/', async (req, res) => {
  if (!req.body.text) {
    res.status(400)
      .json({ message: 'Please pass text.' });
  }

  const list = await new List(req.body);
  const message = await list.save().then(() => 'List saved');

  res.json({ message });
});

/**
 * @name update - update a item
 * @return {Object<{ message: string }>}
 *
 * @example PUT /__/crud-operations/${id}
 */
router.put('/:id', async (req, res) => {
  const message = await List
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => 'List updated');

  res.json({ message });
});

/**
 * @name delete - remove a item
 * @return {Object<{ message: string }>}
 *
 * @example DELETE /__/crud-operations/${id}
 */
router.delete('/:id', async (req, res) => {
  const message = await List
    .findByIdAndRemove(req.params.id)
    .then(() => 'List deleted');

  res.json({ message });
});

/**
 * @name delete-multiple - remove selected items
 * @return {Object<{ message: string }>}
 *
 * @example DELETE /__/crud-operations { selected: [${id}, ${id}, ${id}...] }
 */
router.delete('/', async (req, res) => {
  const { selected } = req.body;

  const message = await List
    .remove({ _id: { $in: selected } })
    .then(() => 'List deleted');

  res.json({ message });
});

// ------------------------- Separate line -------------------------

/**
 * @name list - get a list
 * @param {string} [id] - get a item by ID
 * @param {string} [text] - search for text in list
 * @return {Object<{ data: RelationalList[] }>}
 *
 * @example GET /__/crud-operations/relational
 * @example GET /__/crud-operations/relational?id=${id}
 * @example GET /__/crud-operations/relational?text=${text}
 */
router.get('/relational', async (req, res) => {
  const { id, text } = req.query;

  const find = {};

  if (id) find.where = { ...find.where, id: [id] };
  if (text) find.where = { ...find.where, text: { [Op.like]: `%${text}%` } };

  const data = await RelationalList.findAll(find);
  res.json({ data });
});

/**
 * @name item - get a item
 * @param {string} id - get a item by ID
 * @return {Object<{ data: RelationalList[], message: string }>}
 *
 * @example GET /__/crud-operations/relational/item/${id}
 */
router.get('/relational/item/:id', async (req, res) => {
  const data = await RelationalList.findOne({ where: { id: [req.params.id] } });
  res.json({ data: [data], message: 'Data obtained.' });
});

/**
 * @name count - get a list length
 * @return {Object<{ data: number, message: string }>}
 *
 * @example GET /__/crud-operations/relational/count
 */
router.get('/relational/count', async (req, res) => {
  const data = await RelationalList.count();
  res.json({ data, message: 'Data obtained.' });
});

/**
 * @name pagination - get a list of paging
 * @return {Object<{ data: List[], message: string }>}
 *
 * @example GET /__/crud-operations/relational/pagination?page=${page}&row=${row}
 */
router.get('/relational/pagination', async (req, res) => {
  // TODO: pagination
  // const page = Number(req.query.page) || 1;
  // const row = Number(req.query.row) || 5;

  const data = await RelationalList.findAndCountAll({ offset: 0, limit: 5 });
  res.json({ data });
});

/**
 * @name create - create a item
 * @return {Object<{ message: string }>}
 *
 * @example POST /__/crud-operations/relational { text: ${text} }
 */
router.post('/relational', async (req, res) => {
  const message = await RelationalList
    .create(req.body)
    .then(() => 'List saved');

  res.json({ message });
});

/**
 * @name update - update a item
 */
router.put('/relational/:id', async (req, res) => {
  const message = await RelationalList
    .update(
      // TODO: update
      { updatedAt: req.body },
      { where: { id: req.params.id } },
    )
    .then(() => 'List saved');

  res.json({ message });
});

/**
 * @name delete - remove a item
 * @return {Object<{ message: string }>}
 *
 * @example DELETE /__/crud-operations/relational/${id}
 */
router.delete('/relational/:id', async (req, res) => {
  const message = await RelationalList
    .destroy({ where: { id: req.params.id } })
    .then(() => 'List deleted');

  res.json({ message });
});

/**
 * @name delete-multiple - remove selected items
 * @return {Object<{ message: string }>}
 *
 * @example DELETE /__/crud-operations/relational { selected: [${id}, ${id}, ${id}...] }
 */
router.delete('/relational', async (req, res) => {
  // TODO: delete many
  // const { selected } = req.body;

  res.json({ message: '' });
});

export default router;
