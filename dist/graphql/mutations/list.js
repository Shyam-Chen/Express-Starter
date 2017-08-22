'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _models = require('../../models');

var _list = require('../types/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @example
 * mutation {
 *   addText(text: "Web GO") {
 *     _id
 *     text
 *   }
 * }
 */
exports.default = {
  addText: {
    type: _list2.default,
    args: {
      text: {
        name: 'text',
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      }
    },
    async resolve(root, { text }) {
      try {
        const list = await new _models.List({ text });
        return await list.save();
      } catch (err) {
        throw err;
      }
    }
  }
  // updateText: {
  //
  // },
  // deleteText: {
  //
  // }
};