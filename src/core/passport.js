import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import FacebookStrategy from 'passport-facebook-token';

import { SECRET_KEY, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } from '~/env';
import { User } from '~/authentication/document';

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
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
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      fbGraphVersion: 'v9.0',
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    },
  ),
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

export default passport;
