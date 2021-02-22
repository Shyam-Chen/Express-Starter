import { UserColl } from '../model';

describe('authentication', () => {
  it('test', async () => {
    const user = await new UserColl({
      username: 'shyam-chen',
      password: '3345678',
      email: 'shyam.chen@gmail.com',
    });

    expect(user).toBeTruthy();
  });

  it('test', async () => {
    const user = await new UserColl({
      username: 'shyam-chen',
      password: '3345678',
      email: 'shyam.chen',
    });

    try {
      await user.validate();
    } catch ({ errors }) {
      expect(errors.email.message).toEqual('shyam.chen is not a valid email format');
    }
  });
});
