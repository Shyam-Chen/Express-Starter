import request from 'supertest';
import { graphql } from 'graphql';

import server from '~/app';
import schema from '~/graphql';

describe('REST', () => {
  it('list', async () => {
    const { body } = await request(server).get('/__/list');
    expect(body).toBeDefined();
  });
});

describe('GraphQL', () => {
  it('list', async () => {
    const query = `{ list { _id text } }`;
    const { data: { list } } = await graphql(schema, query);
    expect(list).toBeDefined();
  });
});
