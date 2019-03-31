import request from 'supertest';

describe('Hello World', () => {
  it('should get a hello world', async () => {
    const { statusCode, body } = await request(global.API_URL)
      .post('/__/graphql')
      .send({ query: 'query { helloWorld }' });

    expect(statusCode).toEqual(200);

    expect(body).toEqual({
      data: {
        helloWorld: 'Hello, World!',
      },
    });
  });
});
