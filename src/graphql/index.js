import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { listQueries, listMutations } from './list';

export const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...listQueries
  })
});

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...listMutations
  })
});

export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation
})
