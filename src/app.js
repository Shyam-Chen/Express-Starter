import { join } from 'path';
import express from 'express';
import jwt from 'express-jwt';
import graphql from 'express-graphql';
import socket from 'socket.io';
import amqp from 'amqplib';
import mongoose from 'mongoose';
import history from 'express-history-api-fallback';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import routes from './routes';
import { schema } from './graphql';

const app = express();
const root = join(__dirname, '../public');

app.set('port', (process.env.PORT || 3000));
app.set('mongodb-uri', (process.env.MONGODB_URI || 'mongodb://web-go:web-go@ds133961.mlab.com:33961/web-go-demo'));
app.set('secret', process.env.SECRET || 'webgo');

mongoose.connect(app.get('mongodb-uri'));
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log('DB: Connection Succeeded.'));

app.use(compression());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(jwt({ secret: Buffer.from(app.get('secret'), 'base64'), credentialsRequired: false }));

/**
 * @name REST
 */
app.use(routes);

/**
 * @name GraphQL
 */
app.use('/__/graphql', graphql(() => ({ schema, graphiql: true })));

app.use(express.static(root));
app.use(history('index.html', { root }));

const server = app.listen(app.get('port'), (): void => {
  console.log('App: Bootstrap Succeeded.');
  console.log(`Port: ${app.get('port')}.`);
});

const io = socket.listen(server);

io.on('connection', socket => {
  console.log('WS: Establish a connection.');
  socket.on('disconnect', () => console.log('WS: Disconnected'));

  socket.emit('A', { foo: 'bar' });
  socket.on('B', data => console.log(data));
});

amqp.connect('amqp://gnnwevxx:V1PhfxZSO_-CJ6agZGipEBVmFX508N0P@black-boar.rmq.cloudamqp.com/gnnwevxx')
  .then(conn => {
    process.once('SIGINT', () => conn.close());

    return conn.createChannel().then(channel => {
      let ok = channel.assertQueue('hello', { durable: false });

      ok = ok.then(() => {
        return channel.consume('hello', msg => {
          console.log(" [x] Received '%s'", msg.content.toString());
        }, { noAck: true });
      });

      return ok.then(() => {
        console.log(' [*] Waiting for messages. To exit press CTRL + C.');
      });
    });
  })
  .catch(console.warn);

export { server, io };
