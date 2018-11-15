import request from 'supertest';

import api from '~/api';

describe('Hello World', () => {
  afterEach(async () => {
    await api.close();
  });

  it('should get a hello world', async () => {
    const { statusCode, body } = await request(api)
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
