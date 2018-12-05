import rest from '../rest';
import { List } from '../document';

describe('text-list', () => {
  it('should handle routes', async () => {
    const api = rest.stack[0];
    const textList = api.route.stack[0];

    const fakeData = [{ _id: 'vn3RecDbwMQTjttnluZW', text: 'qaz123' }];

    List.find = jest.fn(() => ({
      exec: () => new Promise(res => res(fakeData)),
    }));

    const req = {
      query: {},
    };

    const res = {
      json(obj) {
        expect(obj).toEqual({
          data: fakeData,
          message: 'Data obtained.',
        });
      },
    };

    await textList.handle(req, res);
  });
});
