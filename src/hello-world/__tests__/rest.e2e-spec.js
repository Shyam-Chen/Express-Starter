import request from 'supertest';

import api from '~/api';

describe('Hello World', () => {
  afterEach(async () => {
    await api.close();
  });

  it('should get a hello world', async () => {
    const { statusCode, text } = await request(api)
      .get('/__/hello-world');

    expect(statusCode).toEqual(200);
    expect(text).toEqual('Hello, World!');
  });
});
