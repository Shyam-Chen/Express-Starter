import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import { SECRET } from '~/env';
import { User } from '~/authorization/document';

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
  },
  async (jwtPayload, done) => {
    try {
      if (Date.now() > jwtPayload.expires) return done('Token expired');

      const user = await User.findOne({ username: jwtPayload.username }).exec();
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  },
));

export default passport;
