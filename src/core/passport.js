import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy } from 'passport-jwt';

import { SECRET } from '~/env';
import { User } from '~/authorization/document';

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username }).exec();
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      return done(null, user);
    }

    return done('Incorrect Username / Password');
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JWTStrategy(
  {
    jwtFromRequest(req) {
      let token = null;
      if (req && req.cookies) token = req.cookies.jwt;
      return token;
    },
    secretOrKey: SECRET,
  },
  async (jwtPayload, done) => {
    try {
      if (Date.now() > jwtPayload.expires) return done('Token expired');
      return done(null, jwtPayload);
    } catch (error) {
      return done(error);
    }
  },
));

export default passport;
