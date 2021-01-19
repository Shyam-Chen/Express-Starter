import request from 'supertest';
import { print } from 'graphql';
import { gql } from 'apollo-server-express';

import app from '~/app';

describe('Hello World', () => {
  it('should get a `Hello, World!`', async () => {
    const query = gql`
      query {
        helloWorld
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query: print(query) });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ data: { helloWorld: 'Hello, World!' } });
  });

  it('should get a `Hello, Express!`', async () => {
    const query = gql`
      query {
        helloWorld(data: "Express")
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query: print(query) });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ data: { helloWorld: 'Hello, Express!' } });
  });
});
