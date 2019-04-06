import rest from '../rest';

describe('Hello World', () => {
  it('should get a `Hello, World!`', async () => {
    const route = rest.stack
      .filter(layer => layer.route.path === '/' && layer.route.methods.get)[0]
      .route.stack[0];

    const req = {};

    const res = {
      send(msg) {
        expect(msg).toEqual('Hello, World!');
      },
    };

    await route.handle(req, res);
  });
});
