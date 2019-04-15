import rest from '../rest';
import { fakeData } from '../__mocks__/document';

jest.mock('../document');

const inject = (router, { method, url }) => (
  router.stack
    .filter(layer => layer.route.methods[method] && layer.route.path === url)[0]
    .route.stack[0]
);

describe('CRUD Operations', () => {
  it('should get a list', async () => {
    const route = inject(rest, { method: 'get', url: '/' });

    const req = { query: {} };

    const res = {
      json(obj) {
        expect(obj).toEqual({
          data: fakeData,
          message: 'Data obtained.',
        });
      },
    };

    await route.handle(req, res);
  });

  it('should get a item from ID in list', async () => {
    const route = inject(rest, { method: 'get', url: '/' });

    const req = {
      query: {
        _id: 'vn3RecDbwMQTjttnluZW',
      },
    };

    const res = {
      json(obj) {
        expect(obj).toEqual({
          data: [{ _id: 'vn3RecDbwMQTjttnluZW', text: 'Front-end' }],
          message: 'Data obtained.',
        });
      },
    };

    await route.handle(req, res);
  });

  it('should search a text in list', async () => {
    const route = inject(rest, { method: 'get', url: '/' });

    const req = {
      query: {
        text: 'Back',
      },
    };

    const res = {
      json(obj) {
        expect(obj).toEqual({
          data: [{ _id: '5a4b49309fc9ad8fa4dfe51f', text: 'Back-end' }],
          message: 'Data obtained.',
        });
      },
    };

    await route.handle(req, res);
  });
});
