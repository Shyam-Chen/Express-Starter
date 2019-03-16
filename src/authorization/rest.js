import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SECRET } from '~/env';

import { User } from './document';

const router = Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: passwordHash });
    await user.save();
    res.status(200).json({ username });
  } catch (error) {
    res.status(400).json({ error });
  }
});

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

      res.cookie('jwt', jwt, { httpOnly: true, secure: true });
      res.status(200).json({ username: user.username, token });
    });
  })(req, res);
});

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { user } = req;

  res.status(200).json({ user });
});

router.get('/', async (req, res) => {
  const data = await User.find({}).exec();

  res.json({ data, message: 'Data obtained.' });
});

export default router;
