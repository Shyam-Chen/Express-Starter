'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listRoutes = undefined;

var _express = require('express');

var _models = require('../models');

const router = (0, _express.Router)();

router.get('/', (req, res, next) => {
  _models.List.find({}, (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

router.get('/:text', (req, res, next) => {
  const list = new _models.List({
    text: req.params.text,
    created: new Date()
  });

  list.save(err => {
    if (err) return next(err);
    console.log('List saved successfully.');
    res.json({ message: 'List saved' });
  });
});

router.post('/', (req, res, next) => {
  const list = new _models.List({
    text: req.body.text,
    created: new Date()
  });

  list.save(err => {
    if (err) return next(err);
    console.log('List saved successfully.');
    res.json({ message: 'List saved' });
  });
});

router.put('/:id', (req, res, next) => {
  _models.List.findById(req.params.id, (err, list) => {
    if (err) return next(err);

    for (let prop in req.body) {
      list[prop] = req.body[prop];
    }

    list.save(err => {
      if (err) return next(err);
      res.json({ message: 'List updated' });
    });
  });
});

router.delete('/:id', (req, res, next) => {
  _models.List.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.json({ message: 'List deleted' });
  });
});

const listRoutes = exports.listRoutes = router;