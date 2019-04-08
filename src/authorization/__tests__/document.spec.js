import { User } from '../document';

describe('Authorization', () => {
  it('test', async () => {
    const list = await new User({
      username: 'shyam-chen',
      password: '3345678',
      email: 'shyam.chen@gmail.com',
    });

    expect(list).toBeTruthy();
  });
});
