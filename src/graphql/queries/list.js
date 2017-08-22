import { GraphQLList } from 'graphql';

import listType from '../types/list';
import { List } from '../../models';

export default {
  list: {
    type: new GraphQLList(listType),
    async resolve(root, { text }) {
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
