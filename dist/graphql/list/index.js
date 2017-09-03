'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listResolvers = exports.listTypeDefs = exports.listMutations = exports.listQueries = undefined;

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _mutations = require('./mutations');

var _mutations2 = _interopRequireDefault(_mutations);

var _models = require('../../models');

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

const listTypeDefs = exports.listTypeDefs = `
  type List {
    _id: ID!
    text: String!
  }

  type Query {
    list: [List]
  }

  type Mutation {
    addText(text: String!): List
    updateText(_id: ID!, text: String!): List
    deleteText(_id: ID!): List
  }
`;

const listResolvers = exports.listResolvers = {
  Query: {
    async list(root, { text }) {
      const find = {};

      if (text) {
        find['text'] = {
          $regex: text,
          $options: 'i'
        };
      }

      return await _models.List.find(find).exec();
    }
  },
  Mutation: {
    async addText(root, { text }) {
      const list = await new _models.List({ text });

      return await list.save();
    },
    async updateText(root, { _id, text }) {
      return await _models.List.findOneAndUpdate({ _id }, { $set: { text } }, { new: true, upsert: true }).exec();
    },
    async deleteText(root, { _id }) {
      return await _models.List.findByIdAndRemove(_id);
    }
  }
};