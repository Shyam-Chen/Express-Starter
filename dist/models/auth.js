'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name user
 */
const userSchema = (0, _mongoose.Schema)({
  name: String,
  password: String
});

const User = exports.User = _mongoose2.default.model('User', userSchema);

/**
 * @name google
 */
// TODO: ...