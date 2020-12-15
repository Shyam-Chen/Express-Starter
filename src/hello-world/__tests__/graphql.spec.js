import { graphql, print } from 'graphql';
import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { helloWorldTypeDefs, helloWorldResolvers } from '../graphql';

describe('Hello World', () => {
  it('should get a `Hello, World!`', async () => {
    const schema = makeExecutableSchema({
      typeDefs: helloWorldTypeDefs,
      resolvers: helloWorldResolvers,
    });

    const query = gql`
      query {
        helloWorld
      }
    `;

    const result = await graphql(schema, print(query));

    expect(result).toEqual({
      data: {
        helloWorld: 'Hello, World!',
      },
    });
  });
});
