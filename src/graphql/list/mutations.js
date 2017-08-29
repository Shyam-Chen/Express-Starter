import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

import { List } from '~/models';

import listType from './type';

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
export default {
  addText: {
    type: listType,
    args: {
      text: {
        name: 'text',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    async resolve(root, { text }): { text: string } {
      try {
        const list = await new List({ text });
        return await list.save();
      } catch (err) {
        throw err;
      }
    }
  },
  updateText: {
    type: listType,
    args: {
      _id:{
        name: '_id',
        type: new GraphQLNonNull(GraphQLID)
      },
      text: {
        name: 'text',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    async resolve(root, { _id, text }): { _id: string, text: string } {
      try {
        return await List.findOneAndUpdate(
          { _id },
          { $set: { text } },
          { new: true, upsert: true }
        ).exec();
      } catch (err) {
        throw err;
      }
    }
  },
  deleteText: {
    type: listType,
    args: {
      _id: {
        name: '_id',
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    async resolve(root, { _id }): { _id: string } {
      try {
        return await List.findByIdAndRemove(_id);
      } catch (err) {
        throw err;
      }
    }
  }
};
