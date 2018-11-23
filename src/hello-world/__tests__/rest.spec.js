import rest from '../rest';

describe('Hello World', () => {
  it('should handle route', () => {
    const api = rest.stack[0];
    const helloWorld = api.route.stack[0];

    const req = {};

    const res = {
      send(msg) {
        expect(msg).toEqual('Hello, World!');
        return this;
      },
    };

    helloWorld.handle(req, res);
  });
});
