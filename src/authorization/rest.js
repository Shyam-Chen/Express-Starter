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
  const { username, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: passwordHash });
    await user.save();
    res.status(200).json({ username, message: '' });
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
router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (error, user) => {
    if (error || !user) res.status(400).json({ error });

    const payload = {
      username: user.username,
      expires: Date.now() + 3 * 60 * 60 * 1000,
    };

    req.login(payload, { session: false }, (loginError) => {
      if (loginError) res.status(400).json({ error: loginError });

      const token = jwt.sign(JSON.stringify(payload), SECRET);

      res.status(200).json({ username: user.username, token, message: '' });
    });
  })(req, res);
});

/**
 * @name profile - User profile
 *
 * @example GET /__/authorization/profile Header { token: ${token} }
 */
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { user } = req;

  res.status(200).json({ user });
});

/**
 * @name profile - Update user profile
 */
router.put('/profile', (req, res) => {
  res.json({});
});

router.post('/forgot-password', async () => {
  return {};
});

router.post('/change-email', async () => {
  return {};
});

router.post('/change-password', async () => {
  return {};
});

export default router;
