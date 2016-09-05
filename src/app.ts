import { join } from 'path';

import * as express from 'express';
const mongoose = require('mongoose');

import * as bodyParser from 'body-parser';
import * as logger from 'morgan';


import * as routes from './routes';
import { User } from './models';
import { } from './controllers';

const app = express();

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // ...
});

const account = new User({ name: '陳彥澄' });
console.log(account.name);  // 陳彥澄

account.save();

User.find((err: any, users: any) => {
  console.log(users);  // [ { _id: 57cbd9b75132e81c9ce56077, name: '陳彥澄', __v: 0 } ]
});

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(require('stylus').middleware(join(__dirname, 'public')));
app.use(express.static(join(__dirname, 'public')));

app.use(routes);

app.use((req: any, res: any) => {
  res.status(404);
  res.send('Not Found!');
});

const server = app.listen(3001, 'localhost', () => {
  const { address, port } = server.address();
  console.log(`Listening on http://localhost:${port}`);
});
