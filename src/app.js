import { join } from 'path';
import http from 'http';
import express from 'express';
import socket from 'socket.io';
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
import chalk from 'chalk';

import routes from '~/core/rest';
import apolloServer from '~/core/graphql';
import mongoose from '~/core/mongoose';
import sequelize from '~/core/sequelize';
import passport from '~/core/passport';
import redis from '~/core/redis';

import {
  NODE_ENV, PORT, HOST, SECRET, RATE_LIMIT,
  SENTRY_DSN, STATIC_FILES, RENDERTRON_URL,
} from './env';

export const app = express();
export const server = http.Server(app);
export const io = socket(server);

app.set('socket', io);

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

io.origins(['*:*']);

if (NODE_ENV === 'production') app.use(Raven.requestHandler());

/**
 * @name REST
 */
app.use('/__', routes);

/**
 * @name GraphQL
 */
apolloServer.applyMiddleware({ app, path: '/__/graphql' });
apolloServer.installSubscriptionHandlers(server);

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

server.listen(Number(PORT), HOST, () => {
  console.log(chalk.hex('#009688')(' [*] App: Bootstrap Succeeded.'));
  console.log(chalk.hex('#009688')(` [*] Host: http://${HOST}:${PORT}/.`));

  mongoose.connection.once('open', () => console.log(chalk.hex('#009688')(' [*] Mongo: Connection Succeeded.')));
  mongoose.connection.on('error', err => console.error(err));

  sequelize.authenticate()
    .then(() => console.log(chalk.hex('#009688')(' [*] Postgres: Connection Succeeded.')))
    .catch(err => console.error(err));
});


io.on('connection', (connSocket) => {
  console.log(chalk.hex('#009688')(' [*] Socket: Connection Succeeded.'));
  connSocket.on('disconnect', () => console.log(chalk.hex('#009688')(' [*] Socket: Disconnected.')));
});

export default server;
