import { join } from 'path';
import express from 'express';
import jwt from 'express-jwt';
import graphql from 'express-graphql';
import socket from 'socket.io';
import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import redis from 'redis';
import passport from 'passport';
import history from 'express-history-api-fallback';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import raven from 'raven';

import routes from './rest';
import schema from './graphql';
import { PORT, SECRET, MONGODB_URI, POSTGRES_URL, REDIS_PORT, REDIS_HOST } from './config';

const app = express();

/**
 * @name middleware
 */
app.use(compression());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(jwt({ secret: Buffer.from(SECRET, 'base64'), credentialsRequired: false }));

/**
 * @name rest
 */
app.use('/__', routes);

/**
 * @name graphql
 */
app.use('/__/graphql', graphql(() => ({
  schema,
  graphiql: true,
  pretty: true
})));

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
 * @name mongo
 */
mongoose.connect(MONGODB_URI);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log(' [*] Mongo: Connection Succeeded.'));

/**
 * @name postgres
 */
const sequelize = new Sequelize(POSTGRES_URL);

sequelize.authenticate()
  .then(() => console.log(' [*] Postgres: Connection Succeeded.'))
  .catch(err => console.error(err));

/**
 * @name redis
 */
export const client = redis.createClient(REDIS_PORT, REDIS_HOST);

client.on('connect', () => console.log(' [*] Redis: Connection Succeeded.'));
client.on('error', err => console.error(err));

/**
 * @name socket
 */
export const io = socket.listen(server);

io.on('connection', socket => {
  socket.on('disconnect', () => console.log(' [*] Socket: Disconnected.'));
});

/**
 * @name raven
 */
if (process.env.NODE_ENV === 'production') {
  raven.config('https://ce49059cdcc9414aabc5a3e92e22b8f8:6398526fa2444cc79fb6517a73d7199c@sentry.io/235213')
    .install();
}

export default server;
