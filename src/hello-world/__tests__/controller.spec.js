import controller from '../controller';

const inject = (router, { method, path, position = 0 }) =>
  router.stack.find(l => l.route.methods[method] && l.route.path === path).route.stack[position];

describe('Hello World', () => {
  it('should get a `Hello, World!`', async () => {
    const route = inject(controller, { method: 'post', path: '/' });

    const req = {
      body: {},
    };

    const res = {
      json(body) {
        expect(body).toEqual({ data: 'Hello, World!' });
      },
    };

    await route.handle(req, res);
  });

  it('should get a `Hello, Express!`', async () => {
    const route = inject(controller, { method: 'post', path: '/' });

    const req = {
      body: {
        data: 'Express',
      },
    };

    const res = {
      json(body) {
        expect(body).toEqual({ data: 'Hello, Express!' });
      },
    };

    await route.handle(req, res);
  });
});
