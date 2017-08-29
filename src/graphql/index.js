import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { listQueries, listMutations } from './list';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...listQueries
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...listMutations
    })
  })
});
