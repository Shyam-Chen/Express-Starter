import controller from '../controller';
import { fakeData } from '../__mocks__/collection';

jest.mock('../collection');

const inject = (router, { method, path }) => (
  router.stack
    .filter(layer => layer.route.methods[method] && layer.route.path === path)[0]
    .route.stack[0]
);

describe('CRUD Operations', () => {
  it('should get a list', async () => {
    const route = inject(controller, { method: 'get', path: '/' });

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

  it('should get a item by ID in list', async () => {
    const route = inject(controller, { method: 'get', path: '/' });

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
    const route = inject(controller, { method: 'get', path: '/' });

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

  it('should get a item by ID from params in list', async () => {
    const route = inject(controller, { method: 'get', path: '/item/:id' });

    const req = {
      params: {
        id: 'vn3RecDbwMQTjttnluZW',
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

  it('should get a list length', async () => {
    const route = inject(controller, { method: 'get', path: '/count' });

    const res = {
      json(obj) {
        expect(obj).toEqual({
          data: 2,
          message: 'Data obtained.',
        });
      },
    };

    await route.handle({}, res);
  })
});
