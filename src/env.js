export const NODE_ENV = process.env.NODE_ENV || 'development';
export const INDEX_NAME = process.env.INDEX_NAME || 'local';

export const HOST = process.env.HOST || '0.0.0.0';
export const PORT = process.env.PORT || 3000;

export const SECRET_KEY = process.env.SECRET_KEY || 'jbmpHPLoaV8N0nEpuLxlpT95FYakMPiu';

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';
export const POSTGRES_URL =
  process.env.POSTGRES_URL || 'postgres://tester:12345678@127.0.0.1:5432/test';
export const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379/4';

export const AUTH = {
  JWT: {
    secretKey: process.env.SECRET_KEY || '',
  },
  GOOGLE: {
    clientID: process.env.GOOGLE_ID || '...',
    clientSecret: process.env.GOOGLE_SECRET || '...',
  },
  APPLE: {
    clientID: process.env.APPLE_ID,
    teamId: '',
    keyId: '',
  },
  FACEBOOK: {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
  },
  TWITTER: {
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
  },
  GITHUB: {
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  },
};

export const CLOUDINARY_CONFIG = {
  cloud_name: process.env.CLOUDINARY_NAME || 'sample',
  api_key: process.env.CLOUDINARY_KRY || '874837483274837',
  api_secret: process.env.CLOUDINARY_SECRET || 'a676b67565c6767a6767d6767f676fe1',
};

export const RATE_LIMIT = process.env.RATE_LIMIT || 0;

export const SENTRY_DSN = process.env.SENTRY_DSN || '';
