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

const userTypeDefs = `
  type User {
    id: ID!
    name: String!
  }

  type Query {
    users: [User]
  }
`;

const userResolvers = {
  Query: {
    users() {
      const usersById = {
        1: { id: 1, name: 'Angular' },
        2: { id: 2, name: 'React' },
        3: { id: 3, name: 'Vue' }
      };

      return Object.keys(usersById).map(id => usersById[id])
    }
  }
};

// -

import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

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
