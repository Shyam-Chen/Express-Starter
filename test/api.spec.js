import request from 'supertest';

import { server } from '../src/app';

describe('API', () => {
  it('responds to /__/list', async () => {
    const { statusCode, body } = await request(server).get('/__/list');
    expect(statusCode).toBe(200);
    expect(body).toBeDefined();
  });
});
