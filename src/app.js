import { join } from 'path';
import express from 'express';
import jwt from 'express-jwt';
import graphql from 'express-graphql';
import socket from 'socket.io';
import mongoose from 'mongoose';
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

const app = express();

/**
 * @name config
 */
app.set('port', process.env.PORT || 3000);
app.set('mongodb-uri', process.env.MONGODB_URI || 'mongodb://web-go-user:web-go-user@ds133961.mlab.com:33961/web-go-demo');
app.set('secret', process.env.SECRET || 'webgo');
app.set('redis-port', process.env.REDIS_PORT || 17929);
app.set('redis-host', process.env.REDIS_HOST || 'redis-17929.c1.us-central1-2.gce.cloud.redislabs.com');

/**
 * @name middleware
 */
app.use(compression());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(jwt({ secret: Buffer.from(app.get('secret'), 'base64'), credentialsRequired: false }));

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
const server = app.listen(app.get('port'), (): void => {
  console.log(' [*] App: Bootstrap Succeeded.');
  console.log(` [*] Port: ${app.get('port')}.`);
});

/**
 * @name mongo
 */
mongoose.connect(app.get('mongodb-uri'));
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log(' [*] Mongo: Connection Succeeded.'));

/**
 * @name postgres
 */

/**
 * @name redis
 */
export const client = redis.createClient(
  app.get('redis-port'),
  app.get('redis-host')
);

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
