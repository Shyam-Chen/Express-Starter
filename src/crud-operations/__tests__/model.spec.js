import { ListColl } from '../model';

describe('CRUD Operations', () => {
  it('test', async () => {
    const list = await new ListColl();
    expect(list).toBeTruthy();
  });
});
