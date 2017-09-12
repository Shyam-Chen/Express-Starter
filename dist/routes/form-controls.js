'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

const router = (0, _express.Router)();

router.get('/', (req, res) => {
  res.json({ message: 'TODO: Form Controls API' });
});

exports.default = router;