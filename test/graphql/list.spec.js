import { mockServer } from 'graphql-tools';

import schema from '~/graphql';

describe('GraphQL', () => {
  it('list', async () => {
    const query = `{ list { _id text } }`;
    const server = mockServer(schema);
    const { data: { list } } = await server.query(query);
    expect(list).toBeDefined();
  });
});
