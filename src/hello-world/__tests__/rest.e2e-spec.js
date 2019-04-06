import request from 'supertest';

describe('Hello World', () => {
  it('should get a `Hello, World!`', async () => {
    const { statusCode, text } = await request(global.API_URL)
      .get('/__/hello-world');

    expect(statusCode).toEqual(200);
    expect(text).toEqual('Hello, World!');
  });
});
