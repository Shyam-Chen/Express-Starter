import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { AUTH_GOOGLE } from '~/env';
import { User } from '~/document';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new GoogleStrategy(
  AUTH_GOOGLE,
  (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'google.id': profile.id }, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, user);

        const newUser = new User();

        newUser.google.id = profile.id;
        newUser.google.token = token;
        newUser.google.name = profile.displayName;
        newUser.google.email = profile.emails[0].value;

        newUser.save((errSave) => {
          if (errSave) throw errSave;
          return done(null, newUser);
        });
      });
    });
  },
));

export default passport;
