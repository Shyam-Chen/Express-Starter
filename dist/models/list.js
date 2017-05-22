'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listSchema = (0, _mongoose.Schema)({
  text: String,
  created: Date
});

var List = exports.List = _mongoose2.default.model('List', listSchema);