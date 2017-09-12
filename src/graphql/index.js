import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import { listTypeDefs, listResolvers } from './list';
import { selectTypeDefs, selectResolvers } from './form-controls';

const typeDefs = mergeTypes([
  listTypeDefs,
  selectTypeDefs
]);

const resolvers = mergeResolvers([
  listResolvers,
  selectResolvers
]);

export const schema = makeExecutableSchema({ typeDefs, resolvers });

// -

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
