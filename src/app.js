import { join } from 'path';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import session from 'express-session';
import connectRedis from 'connect-redis';
import rendertron from 'rendertron-middleware';
import history from 'express-history-api-fallback';
import Raven from 'raven';

import routes from '~/core/rest';
import apolloServer from '~/core/graphql';
import passport from '~/core/passport';
import redis from '~/core/redis';

import { NODE_ENV, SECRET, RATE_LIMIT, SENTRY_DSN, STATIC_FILES, RENDERTRON_URL } from './env';

const app = express();

if (NODE_ENV === 'production') Raven.config(SENTRY_DSN).install();

/**
 * @name middleware-functions
 */
app.use(helmet());
app.use(cors());
app.use(rateLimit({ max: Number(RATE_LIMIT), windowMs: 15 * 60 * 1000 }));
app.use(compression());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  store: new (connectRedis(session))({ client: redis }),
  name: 'sid',
  resave: true,
  saveUninitialized: true,
  secret: SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

if (NODE_ENV === 'production') app.use(Raven.requestHandler());

/**
 * @name REST
 */
app.use('/', routes);

/**
 * @name GraphQL
 */
apolloServer.applyMiddleware({ app });

if (NODE_ENV === 'production') app.use(Raven.errorHandler());

/**
 * @name static-files
 */
if (STATIC_FILES) {
  const root = join(__dirname, `../${STATIC_FILES}`);

  // seo friendly
  app.use(rendertron.makeMiddleware({ proxyUrl: RENDERTRON_URL }));

  // serve static
  app.use(express.static(root));

  // spa friendly
  app.use(history('index.html', { root }));
}

export default app;
