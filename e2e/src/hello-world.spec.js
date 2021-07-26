import request from 'supertest';

describe('Hello World', () => {
  it('should get a `Hello, World!`', async () => {
    const response = await request(global.API_URL).post('/hello-world');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ data: 'Hello, World!' });
  });

  it('should get a `Hello, Express!`', async () => {
    const response = await request(global.API_URL)
      .post('/hello-world')
      .send({ data: 'Express' });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ data: 'Hello, Express!' });
  });
});
