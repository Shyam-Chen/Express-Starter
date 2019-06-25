import { ApolloServer } from 'apollo-server-express';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { PubSub } from 'graphql-subscriptions';

import { helloWorldTypeDefs, helloWorldResolvers } from '~/hello-world/graphql';
import { listTypeDefs, listResolvers } from '~/crud-operations/graphql';

const typeDefs = mergeTypes([
  helloWorldTypeDefs,
  listTypeDefs,
], { all: true });

const resolvers = mergeResolvers([
  helloWorldResolvers,
  listResolvers,
]);

// const context = ({ req }) => {
//   if (!req.user) throw new Error('You must be logged in to query this schema');

//   return {
//     user: req.user,
//   };
// };

export const pubsub = new PubSub();

export default new ApolloServer({
  typeDefs,
  resolvers,
  // context,
});
