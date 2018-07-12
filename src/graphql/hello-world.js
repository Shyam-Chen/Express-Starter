import gql from 'graphql-tag';

/**
 * @name Query
 * @example
 * {
 *   helloWorld
 * }
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
