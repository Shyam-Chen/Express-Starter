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

// -

import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import { userTypeDefs, userResolvers } from './sample';
import { listTypeDefs, listResolvers } from './list';

const typeDefs = mergeTypes([
  userTypeDefs,
  listTypeDefs
]);

const resolvers = mergeResolvers([
  userResolvers,
  listResolvers
]);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
