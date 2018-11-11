import request from 'supertest';
import faker from 'faker';

import server from '~/api';

describe('Text List', () => {
  afterEach(async () => {
    await server.close();
  });

  it('should get a text list', async () => {
    const { statusCode, body } = await request(server)
      .get('/__/text-list');

    expect(statusCode).toBe(200);
    expect(body.message).toBe('Data obtained.');
  });

  it('should get a item from ID in list', async () => {
    const { statusCode, body } = await request(server)
      .get('/__/text-list?_id=59901c7dbc9187001ec32c7b');

    expect(statusCode).toBe(200);
    expect(body.message).toBe('Data obtained.');
  });

  it('should search a text in list', async () => {
    const { statusCode, body } = await request(server)
      .get('/__/text-list?text=v');

    expect(statusCode).toBe(200);
    expect(body.message).toBe('Data obtained.');
  });

  it('should get a list length', async () => {
    const { statusCode, body } = await request(server)
      .get('/__/text-list/count');

    expect(statusCode).toBe(200);
    expect(body.message).toBe('Data obtained.');
  });

  it('should /__/text-list/pagination', async () => {
    const { statusCode, body } = await request(server)
      .get('/__/text-list/pagination');

    expect(statusCode).toBe(200);
    expect(body.message).toBe('Data obtained.');
  });

  it('should create a item', async () => {
    const { statusCode, body: { message } } = await request(server)
      .post('/__/text-list')
      .send({ text: faker.name.jobTitle() });

    expect(statusCode).toBe(200);
    expect(message).toBe('List saved');
  });

  it('should update a item', async () => {
    const _id = '59901c7dbc9187001ec32c7b';
    const { statusCode, body: { message } } = await request(server)
      .put(`/__/text-list/${_id}`)
      .send({ text: faker.name.jobTitle() });

    expect(statusCode).toBe(200);
    expect(message).toBe('List updated');
  });

  it('should remove a item', async () => {
    const _id = '59901c7dbc9187001ec32c7b';
    const { statusCode, body: { message } } = await request(server)
      .delete(`/__/text-list/${_id}`);

    expect(statusCode).toBe(200);
    expect(message).toBe('List deleted');
  });

  it('should POST /__/text-list/relational', async () => {
    const { statusCode, body: { message } } = await request(server)
      .post('/__/text-list/relational')
      .send({ text: faker.name.jobTitle() });

    expect(statusCode).toBe(200);
    expect(message).toBe('List saved');
  });

  it('should GET /__/text-list/relational', async () => {
    const { statusCode } = await request(server)
      .get('/__/text-list/relational');

    expect(statusCode).toBe(200);
  });
});
