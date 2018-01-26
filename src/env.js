export const PORT = process.env.PORT || 3000;

export const SECRET = process.env.SECRET || 'webgo';

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://web-go-user:web-go-user@ds133961.mlab.com:33961/web-go-demo';
export const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://ymuxoegt:ONfBcCQylth3boOdUE2EkcZbC2OAbtcm@tantor.db.elephantsql.com:5432/ymuxoegt';

export const REDIS_PORT = process.env.REDIS_PORT || 17929;
export const REDIS_HOST = process.env.REDIS_HOST || 'redis-17929.c1.us-central1-2.gce.cloud.redislabs.com';

export const SENTRY_DSN = process.env.SENTRY_DSN || 'https://70484e0dda784a1081081ca9c8237792:51b5a95ee1e545efba3aba9103c6193e@sentry.io/236866';

export const AUTH_GOOGLE = {
  clientID: process.env.GOOGLE_ID || '584431831746-9b5743ro43sn7p6nfgbui0kqhj557kvt.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || 'stZ7p0BC_oQrUvJKsvqAxehT',
  callbackURL: '/__/auth/google/return',
  passReqToCallback: true
};
