'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _bar = require('../../types/bar');

var _bar2 = _interopRequireDefault(_bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  type: new _graphql.GraphQLList(_bar2.default),
  resolve: function resolve() {
    console.log('model');
  }
};