"use strict";
var express = require('express');
var controllers_1 = require('../controllers');
var router = express.Router();
router.get('/', new controllers_1.Index().ctrl);
exports.route = router;
