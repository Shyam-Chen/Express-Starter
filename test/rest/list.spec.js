import request from 'supertest';

import server from '~/api';

describe('REST', () => {
  afterEach(() => {
    server.close();
  });

  it('should get a text list', async () => {
    const { statusCode } = await request(server)
      .get('/__/list');

    expect(statusCode).toBe(200);
  });

  it('should get a list length', async () => {
    const { statusCode } = await request(server)
      .get('/__/list/count');

    expect(statusCode).toBe(200);
  });

  it('should get a item from ID in list', async () => {
    const { statusCode } = await request(server)
      .get('/__/list?_id=59901c7dbc9187001ec32c7b');

    expect(statusCode).toBe(200);
  });

  it('should search a text in list', async () => {
    const { statusCode } = await request(server)
      .get('/__/list?text=v');

    expect(statusCode).toBe(200);
  });

  it('should /__/list/pagination/2/5', async () => {
    const { statusCode } = await request(server)
      .get('/__/list/pagination/2/5');

    expect(statusCode).toBe(200);
  });

  it('should create a item', async () => {
    const { statusCode } = await request(server)
      .post('/__/list', { text: 'Web Go' });

    expect(statusCode).toBe(200);
  });

  it('should /__/list/relational', async () => {
    const { statusCode } = await request(server)
      .get('/__/list/relational');

    expect(statusCode).toBe(200);
  });
});
