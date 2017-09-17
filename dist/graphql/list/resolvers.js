'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listResolvers = undefined;

var _models = require('../../models');

const listResolvers = exports.listResolvers = {
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
  Query: {
    async list(root, { text }) {
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
        console.error(err);
      }
    }
  },

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
  Mutation: {
    async addText(root, { text }) {
      try {
        const list = await new _models.List({ text });
        return await list.save();
      } catch (err) {
        console.error(err);
      }
    },
    async updateText(root, { _id, text }) {
      try {
        return await _models.List.findOneAndUpdate({ _id }, { $set: { text } }, { new: true, upsert: true }).exec();
      } catch (err) {
        console.error(err);
      }
    },
    async deleteText(root, { _id }) {
      try {
        return await _models.List.findByIdAndRemove(_id);
      } catch (err) {
        console.error(err);
      }
    }
  }
};