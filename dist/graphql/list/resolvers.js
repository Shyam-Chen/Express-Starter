'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listResolvers = undefined;

var _models = require('../../models');

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