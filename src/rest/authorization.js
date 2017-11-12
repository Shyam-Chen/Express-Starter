import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '~/document/authorization';

const router = Router();

/**
 * @name verify - verify the token
 */
router.get('/', (req, res) => {
  res.json({ message: 'TODO' });
});

/**
 * @name create - create a user
 */
router.post('/setup', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = new User({ email, password });
      user.password = bcrypt.hashSync(password, 16);
      const message = await user.save().then(() => 'User saved successfully');
      res.json({ message });
    } else {
      // ...
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @name login - registered user login
 */
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec();

  if (!user) {
    res.json({ message: 'Authentication failed. User not found.' });
  } else {
    if (user.password !== req.body.password) {
      res.json({ message: 'Authentication failed. Wrong password.' });
    } else {
      const token = jwt.sign(user, req.app.get('secret'), { expiresIn: 60 * 60 * 24 });
      res.json({ message: 'Authentication successful.', token });
    }
  }
});

/**
 * @name logout - create a token blacklist
 */
router.post('/logout', (req, res) => {
  res.json({ message: 'TODO' });
});

export default router;
