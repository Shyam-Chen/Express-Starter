import { GraphQLNonNull, GraphQLString } from 'graphql';

import { List } from '~/models';

import listType from '../types/list';

/**
 * @example
 * mutation {
 *   addText(text: "Web GO") {
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
    async resolve(root, { text }) {
      try {
        const list = await new List({ text });
        return await list.save();
      } catch (err) {
        throw err;
      }
    }
  },
  // updateText: {
  //
  // },
  // deleteText: {
  //
  // }
};
