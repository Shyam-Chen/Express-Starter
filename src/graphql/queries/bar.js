import { GraphQLList } from 'graphql';

import barType from '../../types/bar';

export default {
  type: new GraphQLList(barType),
  resolve() {
    console.log('model');
  }
};
