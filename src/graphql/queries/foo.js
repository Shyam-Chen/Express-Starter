import { GraphQLList } from 'graphql';

import fooType from '../../types/foo';

export default {
  type: new GraphQLList(fooType),
  resolve() {
    console.log('model');
  }
};
