import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import { helloWorldTypeDefs, helloWorldResolvers } from '../graphql';

describe('Hello World', () => {
  it('should handle schema', async () => {
    const schema = makeExecutableSchema({
      typeDefs: helloWorldTypeDefs,
      resolvers: helloWorldResolvers,
    });

    const query = 'query { helloWorld }';

    const result = await graphql(schema, query);

    expect(result).toEqual({
      data: {
        helloWorld: 'Hello, World!',
      },
    });
  });
});
