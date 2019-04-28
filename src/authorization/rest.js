import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SECRET } from '~/env';

import { User } from './document';

const router = Router();

/**
 * @name register - Register an account
 * @return {Object<{ username: string, message: string }>}
 *
 * @example POST /__/authorization/register { username: ${username}, password: ${password} }
 */
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: passwordHash, email });
    await user.save();
    res.status(200).json({ username, message: 'Sign up suceesfully' });
  } catch (error) {
    res.status(400).json({ error });
  }
});

/**
 * @name login - get user token
 * @return {Object<{ username: string, token: string, message: string }>}
 *
 * @example POST /__/authorization/login { username: ${username}, password: ${password} }
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      const payload = {
        username: user.username,
        expires: Date.now() + 3 * 60 * 60 * 1000,
      };

      req.login(payload, { session: false }, (error) => {
        if (error) res.status(400).json({ message: error });

        const token = jwt.sign(JSON.stringify(payload), SECRET);

        res.status(200).json({ username: user.username, token, message: 'Sign in suceesfully' });
      });
    } else {
      res.status(400).json({ message: 'Incorrect Username / Password' });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

/**
 * @name profile - User profile
 *
 * @example GET /__/authorization/profile Header { Authorization: `Bearer ${token}` }
 */
router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { user } = req;

  res.status(200).json({ user });
});

/**
 * @name profile - Update user profile
 */
router.put('/profile', async (req, res) => {
  res.json({});
});

router.post('/forgot-password', async (req, res) => {
  res.json({});
});

router.post('/change-email', async (req, res) => {
  res.json({});
});

router.post('/change-password', async (req, res) => {
  res.json({});
});

export default router;
