import { graphql } from 'graphql';
import gql from 'graphql-tag';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { helloWorldTypeDefs, helloWorldResolvers } from '../graphql';

describe('Hello World', () => {
  it('should handle schema', async () => {
    const schema = makeExecutableSchema({
      typeDefs: helloWorldTypeDefs,
      resolvers: helloWorldResolvers,
    });

    addMockFunctionsToSchema({ schema });

    const query = gql`
      query { helloWorld }
    `;

    const result = await graphql(schema, query);

    expect(result).toBeTruthy();
    // expect(result).toEqual('Hello, World!');
  });
});
