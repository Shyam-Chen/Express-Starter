import rest from '../rest';

const inject = (router, { method, path }) => (
  router.stack
    .filter(layer => layer.route.methods[method] && layer.route.path === path)[0]
    .route.stack[0]
);

describe('Hello World', () => {
  it('should get a `Hello, World!`', async () => {
    const route = inject(rest, { method: 'get', path: '/' });

    const req = {};

    const res = {
      send(msg) {
        expect(msg).toEqual('Hello, World!');
      },
    };

    await route.handle(req, res);
  });
});
