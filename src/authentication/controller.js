import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import otp from 'otplib';

import { SECRET_KEY } from '~/env';

import { UserColl } from './model';
import service from './service';

const controller = (() => {
  const router = Router();

  /**
   * @name register - Register an account
   * @return {Object<{ username: string, message: string }>}
   *
   * @example POST /authentication/register { username: ${username}, password: ${password} }
   */
  router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new UserColl({ username, password: passwordHash, email });
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
   * @example POST /authentication/login { username: ${username}, password: ${password} }
   */
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await UserColl.findOne({ username }).exec();
      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) {
        const payload = {
          username: user.username,

          // TODO: remove it
          expires: Date.now() + 3 * 60 * 60 * 1000,
        };

        req.login(payload, { session: false }, async error => {
          if (error) res.status(400).json({ message: error });

          // TODO: expiresIn
          const accessToken = jwt.sign(JSON.stringify(payload), SECRET_KEY, { expiresIn: '7d' });

          // TODO: refreshToken
          const refreshToken = service.generateRefreshToken(user, req.ip);
          await refreshToken.save();

          res.json({
            username: user.username,
            accessToken,
            refreshToken,
            message: 'Sign in suceesfully',
          });
        });
      } else {
        res.status(400).json({ message: 'Incorrect Username / Password' });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

  // TODO:
  router.post('/token', passport.authenticate('jwt'), async (req, res) => {
    res.json({ user: req.user });
  });

  // TODO:
  router.post('/revoke', async (req, res) => {
    res.json({});
  });

  router.post('/login/2fa-send', async (req, res) => {
    res.json({});
  });

  router.post('/login/2fa-verify', async (req, res) => {
    res.json({});
  });

  /**
   * Two-factor authentication
   */

  router.get('/2fa/settings', (req, res) => {
    res.json({});
  });

  router.post('/2fa/setup', (req, res) => {
    // Authenticator app (HOTP) or SMS (TOTP)
    // req.body

    res.json({});
  });

  router.post('/2fa/setup-send', async (req, res) => {
    res.json({});
  });

  router.post('/2fa/setup-verify', async (req, res) => {
    res.json({});
  });

  /**
   * @name profile - User profile
   *
   * @example GET /authentication/profile Header { Authorization: `Bearer ${token}` }
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

  router.post('/profile/auth-passport');

  router.post('/impression-password', async (req, res) => {
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

  /**
   * Social Login
   */

  /**
   * URL /authentication/facebook/login
   * @example <a href="<HOST_NAME>/authentication/facebook/login">
   */
  router.get('/facebook/login', (req, res, next) => {
    // set data in session
    // req.session
    passport.authenticate('facebook')(req, res, next);
  });

  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: 'http://localhost:8000/authentication/login',
    }),
    (req, res) => {
      res.redirect('http://localhost:8000/');
    },
  );

  /**
   * @name facebook-auth
   * @return {Object<{ user: Object }>}
   *
   * @example POST /authentication/facebook/token { access_token: ${accessToken} }
   */
  router.post('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
    res.json({ user: req.user });
  });

  /**
   * @name google-auth
   * @return {Object<{ user: Object }>}
   *
   * @example POST /authentication/google/token { access_token: ${accessToken} }
   */
  router.post('/google/token', passport.authenticate('google-token'), (req, res) => {
    res.json({ user: req.user });
  });

  router.post('/apple/token', passport.authenticate('apple-token'), (req, res) => {
    res.json({ user: req.user });
  });

  return router;
})();

controller.prefix = '/authentication';

export default controller;
