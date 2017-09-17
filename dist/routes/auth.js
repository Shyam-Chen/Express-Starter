'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('../models/auth');

const router = (0, _express.Router)();

router.get('/', (req, res) => {
  res.json({ message: 'TODO: Auth API' });
});

/**
 * @name create - create a user
 */
router.get('/setup', async (req, res, next) => {
  try {
    const webgodemo = new _auth.User({ name: 'webgodemo', password: '123456' });
    const message = await webgodemo.save().then(() => 'User saved successfully');
    res.json({ message });
  } catch (err) {
    next(err);
  }
});

router.get('/login', (req, res) => {
  res.json({ message: 'TODO: Auth API' });
});

router.get('/logout', (req, res) => {
  res.json({ message: 'TODO: Auth API' });
});

exports.default = router;