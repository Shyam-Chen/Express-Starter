export const NODE_ENV = process.env.NODE_ENV || 'development';

export const HOST = process.env.HOST || '0.0.0.0';
export const PORT = process.env.PORT || 3000;

export const SECRET = process.env.SECRET || 'jbmpHPLoaV8N0nEpuLxlpT95FYakMPiu';

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://web-go-user:web-go-user@ds133961.mlab.com:33961/web-go-demo';
export const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://ymuxoegt:ONfBcCQylth3boOdUE2EkcZbC2OAbtcm@tantor.db.elephantsql.com:5432/ymuxoegt';
export const REDIS_URL = process.env.REDIS_URL || 'redis://redis-17929.c1.us-central1-2.gce.cloud.redislabs.com:17929';

export const CLOUDINARY_CONFIG = {
  cloud_name: process.env.CLOUDINARY_NAME || 'sample',
  api_key: process.env.CLOUDINARY_KRY || '874837483274837',
  api_secret: process.env.CLOUDINARY_SECRET || 'a676b67565c6767a6767d6767f676fe1',
};

export const AUTH = {
  GOOGLE: {
    clientID: process.env.GOOGLE_ID || '584431831746-9b5743ro43sn7p6nfgbui0kqhj557kvt.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'stZ7p0BC_oQrUvJKsvqAxehT',
  },
  FACEBOOK: {
    clientID: process.env.FACEBOOK_ID || '...',
    clientSecret: process.env.FACEBOOK_SECRET || '...',
  },
  TWITTER: {
    consumerKey: process.env.TWITTER_KEY || '...',
    consumerSecret: process.env.TWITTER_SECRET || '...',
  },
};

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '...';

export const RATE_LIMIT = process.env.RATE_LIMIT || 0;

export const SENTRY_DSN = process.env.SENTRY_DSN || 'https://70484e0dda784a1081081ca9c8237792:51b5a95ee1e545efba3aba9103c6193e@sentry.io/236866';
export const STATIC_FILES = process.env.STATIC_FILES || null;
export const RENDERTRON_URL = process.env.RENDERTRON_URL || 'https://render-tron.appspot.com/render';
