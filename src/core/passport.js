// @flow

import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { Strategy as TwitterStrategy } from 'passport-twitter';

import { SECRET, AUTH_GOOGLE } from '~/env';
// import { SECRET, AUTH_GOOGLE, AUTH_FACEBOOK, AUTH_TWITTER } from '~/env';
import { User } from '~/authorization/document';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
  },
  (jwtPayload, done) => {
    User.findOneById(jwtPayload.id, (err, user) => {
      if (err) return done(err);
      return done(null, user);
    });
  },
));

passport.use(new GoogleStrategy(
  AUTH_GOOGLE,
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ 'google.id': profile.id }, (err, user) => {
      if (err) return done(err);
      if (user) return done(null, user);

      const newUser = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
      });

      newUser.save((errSave) => {
        if (errSave) throw done(errSave);
        return done(null, newUser);
      });

      return newUser;
    });
  },
));

// passport.use(new FacebookStrategy(
//   AUTH_FACEBOOK,
//   (accessToken, refreshToken, profile, done) => {
//     const newUser = new User({
//       name: profile.displayName,
//       email: profile.emails[0].value,
//     });

//     newUser.findOne({ email: newUser.email }, (err, user) => {
//       if (!user) {
//         newUser.save((errSave, me) => {
//           if (errSave) return done(errSave);
//           return done(null, me);
//         });
//       } else {
//         done(null, user);
//       }
//     });
//   },
// ));

// passport.use(new TwitterStrategy(
//   AUTH_TWITTER,
//   (accessToken, tokenSecret, profile, done) => {
//     const newUser = new User({
//       name: profile.displayName,
//       email: profile.emails[0].value,
//     });

//     newUser.findOne({ email: newUser.email }, (err, user) => {
//       if (!user) {
//         newUser.save((errSave, me) => {
//           if (errSave) return done(errSave);
//           return done(null, me);
//         });
//       } else {
//         done(null, user);
//       }
//     });
//   },
// ));

export default passport;
