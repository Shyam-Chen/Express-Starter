import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '~/document/authorization';

const router = Router();

/**
 * @name verify - verify the token
 */
router.get('/', (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, req.app.get('secret'), (err, decoded) => {
      if (err) {
        return res.json({ message: 'Authentication token failed.' })
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({ message: 'No token provided.' });
  }
});

/**
 * @name create - create a user
 */
router.post('/setup', async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, 16);
    const message = await user.save().then(() => 'User saved successfully');
    res.json({ message });
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
