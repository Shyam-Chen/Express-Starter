import request from 'supertest';

import server from '~/api';

describe('REST', () => {
  afterEach(() => {
    server.close();
  });

  it('list', async () => {
    const { statusCode } = await request(server).get('/__/list');
    expect(statusCode).toBe(200);
  });
});
