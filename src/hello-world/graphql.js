import { gql } from 'apollo-server-express';

/**
 * @name Query
 * @example query { helloWorld }
 */

export const helloWorldTypeDefs = gql`
  type Query {
    helloWorld: String
  }
`;

export const helloWorldResolvers = {
  Query: {
    helloWorld() {
      return 'Hello, World!';
    },
  },
};
