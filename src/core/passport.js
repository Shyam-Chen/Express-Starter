import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

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
    jwtFromRequest: ExtractJwt.fromHeader('token'),
    secretOrKey: SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ username: jwtPayload.username }).exec();

      if (Date.now() > jwtPayload.expires) return done('Token expired');
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  },
));

export default passport;
