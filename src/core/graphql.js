// @flow

import { ApolloServer } from 'apollo-server-express';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import { helloWorldTypeDefs, helloWorldResolvers } from '~/hello-world/graphql';
import { listTypeDefs, listResolvers } from '~/text-list/graphql';

const typeDefs = mergeTypes([
  helloWorldTypeDefs,
  listTypeDefs,
], { all: true });

const resolvers = mergeResolvers([
  helloWorldResolvers,
  listResolvers,
]);

export default new ApolloServer({ typeDefs, resolvers });
