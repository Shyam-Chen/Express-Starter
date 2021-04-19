import service from '../service';

describe('hello-world', () => {
  it('should get a text', async () => {
    expect(service.sayHello()).toBe('Hello, World!');
    expect(service.sayHello('Express')).toBe('Hello, Express!');
  });
});
