import request from 'supertest';
import faker from 'faker';

describe('CRUD Operations', () => {
  it('should get a text list', async () => {
    const { statusCode, body } = await request(global.API_URL)
      .get('/__/crud-operations');

    expect(statusCode).toBe(200);
    expect(body.message).toBe('Data obtained.');
  });

  it('should get a item from ID in list', async () => {
    const { statusCode, body } = await request(global.API_URL)
      .get('/__/crud-operations?_id=5a4b49309fc9ad8fa4dfe51f');

    expect(statusCode).toBe(200);
    expect(body.message).toBe('Data obtained.');
  });

  it('should search a text in list', async () => {
    const { statusCode, body } = await request(global.API_URL)
      .get('/__/crud-operations?text=Developer');

    expect(statusCode).toBe(200);
    expect(body.message).toBe('Data obtained.');
  });

  it('should get a list length', async () => {
    const { statusCode, body } = await request(global.API_URL)
      .get('/__/crud-operations/count');

    expect(statusCode).toBe(200);
    expect(body.message).toBe('Data obtained.');
  });

  it('should /__/crud-operations/pagination', async () => {
    const { statusCode, body } = await request(global.API_URL)
      .get('/__/crud-operations/pagination');

    expect(statusCode).toBe(200);
    expect(body.message).toBe('Data obtained.');
  });

  it('should create a item', async () => {
    const { statusCode, body: { message } } = await request(global.API_URL)
      .post('/__/crud-operations')
      .send({ text: faker.name.jobTitle() });

    expect(statusCode).toBe(200);
    expect(message).toBe('List saved');
  });

  it('should update a item', async () => {
    const _id = '59901c7dbc9187001ec32c7b';
    const { statusCode, body: { message } } = await request(global.API_URL)
      .put(`/__/crud-operations/${_id}`)
      .send({ text: faker.name.jobTitle() });

    expect(statusCode).toBe(200);
    expect(message).toBe('List updated');
  });

  it('should remove a item', async () => {
    const _id = '59901c7dbc9187001ec32c7b';
    const { statusCode, body: { message } } = await request(global.API_URL)
      .delete(`/__/crud-operations/${_id}`);

    expect(statusCode).toBe(200);
    expect(message).toBe('List deleted');
  });

  it('should POST /__/crud-operations/relational', async () => {
    const { statusCode, body: { message } } = await request(global.API_URL)
      .post('/__/crud-operations/relational')
      .send({ text: faker.name.jobTitle() });

    expect(statusCode).toBe(200);
    expect(message).toBe('List saved');
  });

  it('should GET /__/crud-operations/relational', async () => {
    const { statusCode } = await request(global.API_URL)
      .get('/__/crud-operations/relational');

    expect(statusCode).toBe(200);
  });
});
