'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listRoutes = undefined;

var _express = require('express');

var _models = require('../models');

const router = (0, _express.Router)();

router.get('/', async (req, res, next) => {
  const data = {};

  if (req.query.text) {
    data['text'] = {
      $regex: req.query.text,
      $options: 'i'
    };
  }

  _models.List.find(data, (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

router.get('/:id', async (req, res) => {
  const data = await _models.List.findById(req.params.id).exec();
  res.json(data);
});

router.post('/', async (req, res, next) => {
  const list = new _models.List(req.body);

  list.save(err => {
    if (err) return next(err);
    res.json({ message: 'List saved' });
  });
});

router.put('/:id', async (req, res, next) => {
  _models.List.findById(req.params.id, (err, data) => {
    if (err) return next(err);

    for (let prop in req.body) {
      data[prop] = req.body[prop];
    }

    data.save(err => {
      if (err) return next(err);
      res.json({ message: 'List updated' });
    });
  });
});

router.delete('/:id', async (req, res, next) => {
  _models.List.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.json({ message: 'List deleted' });
  });
});

const listRoutes = exports.listRoutes = router;