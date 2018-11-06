// @flow

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { AUTH_GOOGLE } from '~/env';
import document from '~/document';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  document.User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new GoogleStrategy(
  AUTH_GOOGLE,
  (token, refreshToken, profile, callback) => {
    document.User.findOne({ 'google.id': profile.id }, (err, user) => {
      if (err) return callback(err);
      if (user) return callback(null, user);

      const newUser = new document.User();

      newUser.google.id = profile.id;
      newUser.google.token = token;
      newUser.google.name = profile.displayName;
      newUser.google.email = profile.emails[0].value;

      newUser.save((errSave) => {
        if (errSave) throw callback(errSave);
        return callback(null, newUser);
      });

      return newUser;
    });
  },
));

export default passport;
