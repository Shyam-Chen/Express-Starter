'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _models = require('../../models');

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @example
 * {
 *   list {
 *     _id
 *     text
 *   }
 * }
 *
 * {
 *   list(text: "a") {
 *     _id
 *     text
 *   }
 * }
 */
exports.default = {
  list: {
    type: new _graphql.GraphQLList(_type2.default),
    args: {
      text: {
        name: 'text',
        type: _graphql.GraphQLString
      }
    },
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