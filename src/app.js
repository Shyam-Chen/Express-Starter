import express from 'express';
import enableWs from '@small-tech/express-ws';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import * as Sentry from '@sentry/node';

import routes from '~/core/routes';
import passport from '~/core/passport';
import mongoose from '~/core/mongoose';
import winston from '~/core/winston';

import { NODE_ENV, SECRET_KEY, RATE_LIMIT, SENTRY_DSN } from './env';

const app = express();
enableWs(app);

if (NODE_ENV === 'production') Sentry.init({ dsn: SENTRY_DSN });

app.use(helmet());
app.use(cors({ credentials: true }));
app.use(rateLimit({ max: Number(RATE_LIMIT), windowMs: 15 * 60 * 1000 }));
app.use(compression());
app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SECRET_KEY,
    store: new (MongoStore(session))({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 2 },
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

if (NODE_ENV === 'production') app.use(Sentry.Handlers.requestHandler());

app.use('/', routes);

if (NODE_ENV === 'production') app.use(Sentry.Handlers.errorHandler());

export default app;
