import { ListColl } from '../collection';

describe('CRUD Operations', () => {
  it('test', async () => {
    const list = await new ListColl();
    expect(list).toBeTruthy();
  });
});
