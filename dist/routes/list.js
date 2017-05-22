'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listRoutes = undefined;

var _express = require('express');

var _models = require('../models');

var router = (0, _express.Router)();

router.get('/', function (req, res, next) {
  _models.List.find({}, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

router.get('/:text', function (req, res, next) {
  var list = new _models.List({
    text: req.params.text,
    created: new Date()
  });

  list.save(function (err) {
    if (err) return next(err);
    console.log('List saved successfully.');
    res.redirect('/list');
  });
});

router.route('/:id').put(function (req, res, next) {
  _models.List.findById(req.params.id, function (err, list) {
    if (err) return next(err);
    list.text = req.params.text;
    list.updated = new Date();
    list.save(function (err) {
      if (err) return next(err);
      res.redirect('/list');
    });
  });
}).get(function (req, res, next) {
  _models.List.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.redirect('/list');
  });
});

var listRoutes = exports.listRoutes = router;