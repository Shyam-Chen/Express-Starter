'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _models = require('../../models');

var _list = require('../types/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  list: {
    type: new _graphql.GraphQLList(_list2.default),
    async resolve(root, { text }) {
      try {
        const find = {};

        if (text) {
          find['text'] = {
            $regex: text,
            $options: 'i'
          };
        }

        return await _models.List.find(find).exec();
      } catch (err) {
        throw err;
      }
    }
  }
};