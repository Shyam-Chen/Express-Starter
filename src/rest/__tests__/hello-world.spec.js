import router from '../hello-world';

describe('Hello World', () => {
  it('should handle routes', () => {
    const api = router.stack[0];
    const helloWorld = api.route.stack[0];

    const req = {};

    const res = {
      status(code) {
        expect(code).toBe(200);
        return this;
      },
      send(msg) {
        expect(msg).toBe('Hello, World!');
        return this;
      },
    };

    helloWorld.handle(req, res);
  });
});
