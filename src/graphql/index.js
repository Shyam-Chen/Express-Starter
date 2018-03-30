import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import { listTypeDefs, listResolvers } from './text-list';
import { authorizationTypeDefs, authorizationResolvers } from './authorization';

const typeDefs = mergeTypes([
  listTypeDefs,
  authorizationTypeDefs,
], { all: true });

const resolvers = mergeResolvers([
  listResolvers,
  authorizationResolvers,
]);

export default makeExecutableSchema({ typeDefs, resolvers });
