// @flow

import { join } from 'path';
import express from 'express';
import { graphqlExpress } from 'apollo-server-express';
import mongoose from 'mongoose';
import flash from 'express-flash';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import connectRedis from 'connect-redis';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import rendertron from 'rendertron-middleware';
import history from 'express-history-api-fallback';
import Raven from 'raven';
import chalk from 'chalk';

import passport from '~/core/passport';
import { client } from '~/core/redis';

import routes from '~/rest';
import schema from '~/graphql';

import relational from '~/relational';

import { PORT, SECRET, MONGODB_URI, SENTRY_DSN } from './env';

const app = express();

if (process.env.NODE_ENV === 'production') Raven.config(SENTRY_DSN).install();

/**
 * @name middleware-functions
 */
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new (connectRedis(session))({ client }),
  name: 'sid',
  resave: true,
  saveUninitialized: true,
  secret: SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

if (process.env.NODE_ENV === 'production') app.use(Raven.requestHandler());

/**
 * @name REST
 */
app.use('/__', routes);

/**
 * @name GraphQL
 */
app.use('/__/graphql', graphqlExpress({ schema }));

if (process.env.NODE_ENV === 'production') app.use(Raven.errorHandler());

/**
 * @name static-files
 */
if (process.env.NODE_ENV === 'production') {
  const root = join(__dirname, '../public');

  // seo friendly
  app.use(rendertron.makeMiddleware({
    proxyUrl: 'https://render-tron.appspot.com/render',
  }));

  // serve static
  app.use(express.static(root));

  // spa friendly
  app.use(history('index.html', { root }));
}

/**
 * @name api-server
 */
const server = app.listen(PORT, (): void => {
  console.log(chalk.hex('#009688')(' [*] App: Bootstrap Succeeded.'));
  console.log(chalk.hex('#009688')(` [*] Host: http://localhost:${PORT}/.`));
});

/**
 * @name Document
 */
mongoose.connect(MONGODB_URI);
mongoose.connection.once('open', () => console.log(chalk.hex('#009688')(' [*] Mongo: Connection Succeeded.')));
mongoose.connection.on('error', err => console.error(err));

/**
 * @name Relational
 */
relational.sequelize
  .authenticate()
  .then(() => console.log(chalk.hex('#009688')(' [*] Postgres: Connection Succeeded.')))
  .catch(err => console.error(err));

export default server;
