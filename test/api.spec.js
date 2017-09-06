import request from 'supertest';
import { graphql } from 'graphql';

import { server } from '~/app';
import { schema } from '~/graphql';

describe('API', () => {
  it('responds to /__/list', async () => {
    const { statusCode, body } = await request(server).get('/__/list');
    expect(statusCode).toBe(200);
    expect(body).toBeDefined();
  });

  it('responds to /__/list', async () => {
    const query = `
      {
        list {
          _id
          text
        }
      }
    `;

    const { data: { list } } = await graphql(schema, query);

    expect(list).toBeDefined();
  });
});
