'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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