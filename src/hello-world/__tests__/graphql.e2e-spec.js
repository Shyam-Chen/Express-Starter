import request from 'supertest';
import { print } from 'graphql';
import { gql } from 'apollo-server-express';

describe('Hello World', () => {
  it('should get a `Hello, World!`', async () => {
    const query = gql`
      query {
        helloWorld
      }
    `;

    const response = await request(global.API_URL)
      .post('/graphql')
      .send({ query: print(query) });

    expect(response.statusCode).toEqual(200);

    expect(response.body).toEqual({
      data: {
        helloWorld: 'Hello, World!',
      },
    });
  });
});
