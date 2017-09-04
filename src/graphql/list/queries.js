import { GraphQLList, GraphQLString } from 'graphql';

import { List } from '~/models';

import listType from './type';

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
export default {
  list: {
    type: new GraphQLList(listType),
    args: {
      text: {
        name: 'text',
        type: GraphQLString
      }
    },
    async resolve(root, { text }): { text: string } {
      try {
        const find = {};

        if (text) {
          find['text'] = {
            $regex: text,
            $options: 'i'
          };
        }

        return await List.find(find).exec();
      } catch (err) {
        throw err;
      }
    }
  }
};
