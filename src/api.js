// @flow

import { join } from 'path';
import express from 'express';
import graphql from 'express-graphql';
import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import jwt from 'express-jwt';
import passport from 'passport';
import socket from 'socket.io';
import socketRedis from 'socket.io-redis';
import redis from 'redis';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import history from 'express-history-api-fallback';
import Raven from 'raven';

import routes from '~/rest';
import schema from '~/graphql';

import {
  PORT, SECRET,
  MONGODB_URI, POSTGRES_URL, REDIS_PORT, REDIS_HOST,
  SENTRY_DSN
} from './config';

const app = express();

if (process.env.NODE_ENV === 'production') Raven.config(SENTRY_DSN).install();

app.use(compression());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(jwt({ secret: Buffer.from(SECRET, 'base64'), credentialsRequired: false }));

if (process.env.NODE_ENV === 'production') app.use((req, res, next) => !req.secure ? res.redirect(`https://${req.hostname}${req.url}`) : next());
if (process.env.NODE_ENV === 'production') app.use(Raven.requestHandler());

/**
 * @name REST
 */
app.use('/__', routes);

/**
 * @name GraphQL
 */
app.use('/__/graphql', graphql({ schema }));

if (process.env.NODE_ENV === 'production') app.use(Raven.errorHandler());

/**
 * @name static
 */
if (process.env.NODE_ENV === 'production') {
  const root = join(__dirname, '../public');

  app.use(express.static(root));
  app.use(history('index.html', { root }));
}

/**
 * @name server
 */
const server = app.listen(PORT, (): void => {
  console.log(' [*] App: Bootstrap Succeeded.');
  console.log(` [*] Port: ${PORT}.`);
});

/**
 * @name Mongo
 */
mongoose.connect(MONGODB_URI);
mongoose.connection.once('open', () => console.log(' [*] Mongo: Connection Succeeded.'));
mongoose.connection.on('error', err => console.error(err));

/**
 * @name Postgres
 */
new Sequelize(POSTGRES_URL).authenticate()
  .then(() => console.log(' [*] Postgres: Connection Succeeded.'))
  .catch(err => console.error(err));

/**
 * @name Socket
 */
export const io = socket.listen(server);

io.adapter(socketRedis({ host: REDIS_HOST, port: REDIS_PORT }));
io.origins(['*:*']);

io.on('connection', connSocket => {
  connSocket.on('disconnect', () => console.log(' [*] Socket: Disconnected.'));
});

/**
 * @name Redis
 */
export const client = redis.createClient(REDIS_PORT, REDIS_HOST);

client.on('connect', () => console.log(' [*] Redis: Connection Succeeded.'));
client.on('error', err => console.error(err));

export default server;
