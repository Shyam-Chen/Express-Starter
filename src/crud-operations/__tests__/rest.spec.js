import rest from '../rest';

jest.mock('../document');

describe('CRUD Operations', () => {
  it('should get a list', async () => {
    const route = rest.stack
      .filter(layer => layer.route.path === '/' && layer.route.methods.get)[0]
      .route.stack[0];

    const req = {
      query: {},
    };

    const res = {
      json(obj) {
        expect(obj).toEqual({
          data: [{ _id: 'vn3RecDbwMQTjttnluZW', text: 'qaz123' }],
          message: 'Data obtained.',
        });
      },
    };

    await route.handle(req, res);
  });
});
