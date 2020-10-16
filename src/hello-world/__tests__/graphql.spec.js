import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import gql from 'graphql-tag';

import { helloWorldTypeDefs, helloWorldResolvers } from '../graphql';

describe('Hello World', () => {
  it('should get a `Hello, World!`', async () => {
    const schema = makeExecutableSchema({
      typeDefs: helloWorldTypeDefs,
      resolvers: helloWorldResolvers,
    });

    const query = gql`query { helloWorld }`;

    const result = await graphql(schema, query);

    expect(result).toEqual({
      data: {
        helloWorld: 'Hello, World!',
      },
    });
  });
});
