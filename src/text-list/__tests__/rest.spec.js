import rest from '../rest';
import { List } from '../document';

describe('text-list', () => {
  it('should handle routes', async () => {
    jest.spyOn(List, 'find');

    const api = rest.stack[0];
    const textList = api.route.stack[0];

    const req = {
      query: {},
    };

    const res = {
      json(obj) {
        expect(obj).toEqual({
          data: [],
          message: 'Data obtained.',
        });

        return this;
      },
    };

    textList.handle(req, res);
  });
});
