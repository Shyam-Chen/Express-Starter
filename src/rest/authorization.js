import { Router } from 'express';
import bcrypt from 'bcrypt';

import { User } from '~/models/authorization';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Authorization API' });
});

/**
 * @name create - create a user
 */
router.get('/setup', async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 16);
    const message = await user.save().then(() => 'User saved successfully');
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
