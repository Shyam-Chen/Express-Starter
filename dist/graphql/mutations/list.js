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
 *
 * mutation {
 *   updateText(_id: "599b8fb525b689001eb19183", text: "Web GO") {
 *     _id
 *     text
 *   }
 * }
 *
 * mutation {
 *   deleteText(_id: "599c03f34573776d764dc069") {
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
  },
  updateText: {
    type: _list2.default,
    args: {
      _id: {
        name: '_id',
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      },
      text: {
        name: 'text',
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      }
    },
    async resolve(root, { _id, text }) {
      try {
        return await _models.List.findOneAndUpdate({ _id }, { $set: { text } }, { new: true, upsert: true }).exec();
      } catch (err) {
        throw err;
      }
    }
  },
  deleteText: {
    type: _list2.default,
    args: {
      _id: {
        name: '_id',
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      }
    },
    async resolve(root, { _id }) {
      try {
        return await _models.List.findByIdAndRemove(_id);
      } catch (err) {
        throw err;
      }
    }
  }
};