'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _foo = require('../../types/foo');

var _foo2 = _interopRequireDefault(_foo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  type: new _graphql.GraphQLList(_foo2.default),
  resolve: function resolve() {
    console.log('model');
  }
};