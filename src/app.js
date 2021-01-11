import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import session from 'express-session';
import connectRedis from 'connect-redis';
import * as Sentry from '@sentry/node';

import routes from '~/core/rest';
import apolloServer from '~/core/graphql';
import passport from '~/core/passport';
import redis from '~/core/redis';

import { NODE_ENV, SECRET_KEY, RATE_LIMIT, SENTRY_DSN } from './env';

const app = express();

if (NODE_ENV === 'production') Sentry.init({ dsn: SENTRY_DSN });

/**
 * @name middlewares
 */
app.use(helmet());
app.use(cors({ credentials: true }));
app.use(rateLimit({ max: Number(RATE_LIMIT), windowMs: 15 * 60 * 1000 }));
app.use(compression());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  store: new (connectRedis(session))({ client: redis }),
  name: 'sid',
  resave: true,
  saveUninitialized: true,
  secret: SECRET_KEY,
}));
app.use(passport.initialize());
app.use(passport.session());

if (NODE_ENV === 'production') app.use(Sentry.Handlers.requestHandler());

/**
 * @name REST
 */
app.use('/', routes);

/**
 * @name GraphQL
 */
apolloServer.applyMiddleware({ app });

if (NODE_ENV === 'production') app.use(Sentry.Handlers.errorHandler());

export default app;
