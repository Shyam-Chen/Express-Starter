// @flow

import { Router, type $Request, type $Response } from 'express';
import { Op } from 'sequelize';  // eslint-disable-line
import { from } from 'rxjs';  // eslint-disable-line
import request from 'request-promise';

import { List } from './document';
import { RelationalList } from './relational';

const router: Router = Router();

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
router.get('/', async (req: $Request, res: $Response) => {
  const { _id, text } = req.query;

  const find = {};

  if (_id) find._id = { _id };
  if (text) find.text = { $regex: text, $options: 'i' };

  const data = await List.find(find).exec();

  res.json({ data, message: 'Data obtained.' });
});

/**
 * @name item - get a item
 * @param {string} id - get a item by ID
 * @return {Object<{ data: List[], message: string }>}
 *
 * @example GET /__/text-list/${id}
 */
router.get('/item/:id', (req: $Request, res: $Response) => {
  from(List.find({ _id: req.params.id }).exec())
    .subscribe(data => res.json({ data, message: 'Data obtained.' }));
});

/**
 * @name count - get a list length
 * @return {Object<{ data: number, message: string }>}
 *
 * @example GET /__/text-list/count
 */
router.get('/count', (req: $Request, res: $Response) => {
  from(List.count().exec())
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
router.get('/pagination', async (req: $Request, res: $Response) => {
  const page = Number(req.query.page) || 1;
  const row = Number(req.query.row) || 5;

  const list = await List.find({}).exec();
  const data = [];

  for (let i = 0, l = list.length; i < l / row; i++) {
    if (page === (i + 1)) {
      data.push(List.find({}).skip(i * row).limit(row));
    }
  }

  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
  const count = await request(`${baseUrl}/count`);

  res.json({
    data: [...await Promise.all(data)],
    total: JSON.parse(count).data,
    message: 'Data obtained.',
  });
});

/**
 * @name create - create a item
 * @return {Object<{ message: string }>}
 *
 * @example POST /__/text-list { text: ${text} }
 */
router.post('/', async (req: $Request, res: $Response) => {
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
 * @example PUT /__/text-list/${id}
 */
router.put('/:id', async (req: $Request, res: $Response) => {
  const message = await List
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => 'List updated');

  res.json({ message });
});

/**
 * @name delete - remove a item
 * @return {Object<{ message: string }>}
 *
 * @example DELETE /__/text-list/${id}
 */
router.delete('/:id', async (req: $Request, res: $Response) => {
  const message = await List
    .findByIdAndRemove(req.params.id)
    .then(() => 'List deleted');

  res.json({ message });
});

/**
 * @name delete-many - remove multiple items
 */
// TODO: delete multiple items through conditions

// ------------------------- Separate line -------------------------

/**
 * @name list - get a list
 * @param {string} [text] - search for text in list
 * @return {Object<{ data: RelationalList[] }>}
 *
 * @example GET /__/text-list/relational
 * @example GET /__/text-list/relational?text=${text}
 */
router.get('/relational', async (req: $Request, res: $Response) => {
  // TODO: get a item with ID
  // const { text } = req.query;

  const find = {};

  // if (text) {
  //   find.where = {
  //     text: {
  //       [Op.like]: `%${text}%`,
  //     },
  //   };
  // }

  const data = await RelationalList.findAll(find);
  res.json({ data });
});

/**
 * @name count - get a list length
 * @return {Object<{ data: number }>}
 *
 * @example GET /__/text-list/relational/count
 */
router.get('/relational/count', async (req: $Request, res: $Response) => {
  const data = await RelationalList.count();
  res.json({ data });
});

/**
 * @name pagination - get a list of paging
 */
router.get('/relational/pagination', (req: $Request, res: $Response) => {
  // TODO: pagination
  res.json({});
});

/**
 * @name create - create a item
 * @return {Object<{ message: string }>}
 *
 * @example POST /__/text-list/relational { text: ${text} }
 */
router.post('/relational', async (req: $Request, res: $Response) => {
  const message = await RelationalList
    .create(req.body)
    .then(() => 'List saved');

  res.json({ message });
});

/**
 * @name update - update a item
 */
router.put('/relational/:id', async (req: $Request, res: $Response) => {
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
 * @example DELETE /__/text-list/relational/${id}
 */
router.delete('/relational/:id', async (req: $Request, res: $Response) => {
  const message = await RelationalList
    .destroy({ where: { id: req.params.id } })
    .then(() => 'List deleted');

  res.json({ message });
});

export default router;
