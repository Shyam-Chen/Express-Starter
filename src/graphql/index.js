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

export default makeExecutableSchema({ typeDefs, resolvers });
