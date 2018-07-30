// @flow

import { ApolloServer } from 'apollo-server-express';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import { helloWorldTypeDefs, helloWorldResolvers } from './hello-world';
import { listTypeDefs, listResolvers } from './text-list';
import { authorizationTypeDefs, authorizationResolvers } from './authorization';

const typeDefs = mergeTypes([
  helloWorldTypeDefs,
  listTypeDefs,
  authorizationTypeDefs,
], { all: true });

const resolvers = mergeResolvers([
  helloWorldResolvers,
  listResolvers,
  authorizationResolvers,
]);

export default new ApolloServer({ typeDefs, resolvers });
