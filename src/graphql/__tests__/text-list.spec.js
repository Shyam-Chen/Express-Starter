import request from 'supertest';

import server from '~/api';

describe('Text List', () => {
  afterEach(async () => {
    await server.close();
  });

  it('nice', async () => {
    const { statusCode, body: { data: { list } } } = await request(server)
      .post('/__/graphql')
      .send({ query: 'query { list { _id text } }' });

    expect(statusCode).toBe(200);
    expect(list).toBeDefined();
  });

  it('nice _id', async () => {
    const _id = '5a2653700b81820041010afe';
    const { statusCode, body: { data: { list } } } = await request(server)
      .post('/__/graphql')
      .send({ query: `query { list(_id: "${_id}") { _id text } }` });

    expect(statusCode).toBe(200);
    expect(list).toBeDefined();
  });
});
