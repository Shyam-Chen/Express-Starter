import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import FacebookTokenStrategy from 'passport-facebook-token';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import GoogleTokenStrategy from '@smth-for/passport-google-access-token';
import AppleStrategy from '@nicokaiser/passport-apple';
import AppleTokenStrategy from '@mrbatista/passport-apple-token'; // TODO: new passport-apple-token

import {
  SECRET_KEY,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  APPLE_SERVICES_ID,
  APPLE_TEAM_ID,
  APPLE_KEY_ID,
  APPLE_PRIVATE_KEY,
} from '~/env';
import { Authentication } from '~/authentication';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    },
    async (jwtPayload, done) => {
      try {
        // TODO: remove it
        if (Date.now() > jwtPayload.expires) return done('Token expired');

        const find = { username: jwtPayload.username };
        const user = await Authentication.UserColl.findOne(find).exec();
        return done(null, user);

        // const refreshTokens = await Authentication.model.RefreshToken.find({ user: user.id });
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
      callbackURL: '/authentication/facebook/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

// https://developers.facebook.com/docs/facebook-login/web
passport.use(
  new FacebookTokenStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      fbGraphVersion: 'v9.0',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/authentication/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

// https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
passport.use(
  new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.use(
  new AppleStrategy(
    {
      clientID: APPLE_SERVICES_ID,
      teamID: APPLE_TEAM_ID,
      keyID: APPLE_KEY_ID,
      key: APPLE_PRIVATE_KEY,
      callbackURL: '/authentication/apple/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

// https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js
passport.use(
  new AppleTokenStrategy(
    {
      clientID: APPLE_SERVICES_ID,
      // Generate clientSecret for accessToken and refreshToken
      teamID: APPLE_TEAM_ID,
      keyID: APPLE_KEY_ID,
      key: APPLE_PRIVATE_KEY,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
