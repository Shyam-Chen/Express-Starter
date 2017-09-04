'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listMutations = exports.listQueries = undefined;

var _typeDefs = require('./type-defs');

Object.keys(_typeDefs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _typeDefs[key];
    }
  });
});

var _resolvers = require('./resolvers');

Object.keys(_resolvers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _resolvers[key];
    }
  });
});

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _mutations = require('./mutations');

var _mutations2 = _interopRequireDefault(_mutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const listQueries = exports.listQueries = {
  list: _queries2.default.list
};

const listMutations = exports.listMutations = {
  addText: _mutations2.default.addText,
  updateText: _mutations2.default.updateText,
  deleteText: _mutations2.default.deleteText
};

// -