import { ApolloServer } from 'apollo-server-express';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';

import { HelloWorld } from '~/hello-world';
import { CrudOperations } from '~/crud-operations';
import { Authentication } from '~/authentication';
// import { FileUploads } from '~/file-uploads';
// import { RealtimeData } from '~/realtime-data';

const typeDefs = mergeTypeDefs(
  [
    HelloWorld.typeDef,
    CrudOperations.typeDef,
    Authentication.typeDef,
    // FileUploads.typeDef,
    // RealtimeData.typeDef,
  ],
  {
    all: true,
  },
);

const resolvers = mergeResolvers([
  HelloWorld.resolver,
  CrudOperations.resolver,
  Authentication.resolver,
  // FileUploads.resolver,
  // RealtimeData.resolver,
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
