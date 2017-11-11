import jwt from 'jsonwebtoken';
import passport from 'passport';
import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt';

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
};

passport.use(new StrategyJwt(jwtOptions, (payload, done) => done(null, payload)));

function auth(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!err && user) {
      req.user = user;
      next();
    } else {
      next(err);
    }
  })(req, res, next);
}

export default {
  init: () => passport.initialize(),
  sign: payload => `jwt ${jwt.sign(payload, jwtOptions.secretOrKey)}`,
  auth: () => auth
};
