'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _models = require('../models');

const router = (0, _express.Router)();

/**
 * @name list - get a list or search list
 * @param {string} text - search for text in list
 * @example get a list - /__/list
 * @example search list - /__/list?text=${text}
 */
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

    const data = await _models.List.find(find).exec();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * @name pagination
 * @param {number} page - current page number
 * @param {number} row - rows per page
 */
router.get('/:page/:row', async (req, res, next) => {
  try {
    const row = Number(req.params.row);
    const list = await _models.List.find({}).exec();

    for (let i = 0; i < list.length / row; i++) {
      if (Number(req.params.page) === i + 1) {
        const data = await _models.List.find({}).skip(i * row).limit(row).exec();
        res.json(data);
      }
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @name item - get a item from ID in list
 * @example /__/list/${id}
 */
router.get('/:id', async (req, res, next) => {
  try {
    const data = await _models.List.findById(req.params.id).exec();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * @name create - create a item
 */
router.post('/', async (req, res, next) => {
  try {
    if (req.body.text) {
      const list = await new _models.List(req.body);
      const message = await list.save().then(() => 'List saved');
      res.json({ message });
    } else {
      res.json({ message: 'Please pass text.' });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @name update - update a item
 */
router.put('/:id', async (req, res, next) => {
  try {
    const list = await _models.List.findById(req.params.id).exec();

    for (let prop in req.body) {
      if (req.body) list[prop] = req.body[prop];
    }

    const message = await list.save().then(() => 'List updated');
    res.json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @name delete - remove a item
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const message = await _models.List.findByIdAndRemove(req.params.id).then(() => 'List deleted');
    res.json({ message });
  } catch (err) {
    next(err);
  }
});

exports.default = router;