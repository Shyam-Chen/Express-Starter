import { List } from '../document';

describe('CRUD Operations', () => {
  it('test', async () => {
    const list = await new List();
    expect(list).toBeTruthy();
  });
});
