import { ApolloServer } from 'apollo-server-express';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';

import { HelloWorld } from '~/hello-world';
import { listTypeDefs, listResolvers } from '~/crud-operations/graphql';
import authentication from '~/authentication/graphql';

const typeDefs = mergeTypeDefs(
  [
    HelloWorld.typeDef,
    listTypeDefs,
    authentication.typeDefs,
    // ...
  ],
  {
    all: true,
  },
);

const resolvers = mergeResolvers([
  HelloWorld.resolver,
  listResolvers,
  authentication.resolvers,
  // ...
]);

const context = ({ req }) => {
  // if (!req.user) throw new Error('You must be logged in to query this schema');

  return {
    user: req.user,
  };
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
export const pubsub = new PubSub();

export default new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
