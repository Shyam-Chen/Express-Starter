import request from 'supertest';

describe('CRUD Operations', () => {
  it('test', async () => {
    const { statusCode, body: { data: { list } } } = await request(global.API_URL)
      .post('/__/graphql')
      .send({ query: 'query { list { _id text } }' });

    expect(statusCode).toBe(200);
    expect(list).toBeDefined();
  });

  it('test', async () => {
    const _id = '5a2653700b81820041010afe';
    const { statusCode, body: { data: { list } } } = await request(global.API_URL)
      .post('/__/graphql')
      .send({ query: `query { list(_id: "${_id}") { _id text } }` });

    expect(statusCode).toBe(200);
    expect(list).toBeDefined();
  });
});
