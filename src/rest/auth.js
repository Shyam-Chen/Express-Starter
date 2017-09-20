import { Router } from 'express';

import { User } from '~/models/auth';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'TODO: Auth API' });
});


/**
 * @name create - create a user
 */
router.get('/setup', async (req, res, next) => {
  try {
    const webgodemo = new User({ name: 'webgodemo', password: '123456' });
    const message = await webgodemo.save().then(() => 'User saved successfully');
    res.json({ message });
  } catch (err) {
    next(err);
  }
});

router.get('/login', (req, res) => {
  res.json({ message: 'TODO: Auth API' });
});

router.get('/logout', (req, res) => {
  res.json({ message: 'TODO: Auth API' });
});

export default router;
