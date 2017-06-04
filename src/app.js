import { join } from 'path';
import express from 'express';
import jwt from 'express-jwt';
import graphql from 'express-graphql';
import socket from 'socket.io';
import mongoose from 'mongoose';
import history from 'express-history-api-fallback';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { listRoutes } from './routes';
import { schema, rootValue } from './graphql';

const app = express();
const root = join(__dirname, '../public');

app.set('port', (process.env.PORT || 8000));
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

app.use('/__/graphql', graphql(() => ({
  schema,
  rootValue,
  graphiql: true
})));

app.use('/__/list', listRoutes);

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

export default app;

// <script>
//   const xhr = new XMLHttpRequest();
//   xhr.responseType = 'json';
//   xhr.open('POST', '/__/graphql');
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   xhr.setRequestHeader('Accept', 'application/json');
//   xhr.onload = () => console.log('GraphQL:', xhr.response);
//   xhr.send(JSON.stringify({ query: '{ helloWorld }' }));
// </script>

// <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script>
// <script>
//   const socket = io();

//   socket.on('connect', () => console.log('WS: Accept a connection.'));

//   socket.on('A', data => {
//     console.log(data);
//     socket.emit('B', { foo: 'baz' });
//   });
// </script>
