import { join } from 'path';

import * as express from 'express';
const mongoose = require('mongoose');

import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as serveStatic from 'serve-static';


import * as routes from './routes';
import { } from './models';
import { } from './controllers';

const app = express();

// mongoose.connect('mongodb://localhost/test');

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(require('stylus').middleware(join(__dirname, 'public')));
app.use(serveStatic(join(__dirname, 'public')));

app.use(routes);

app.use((req: any, res: any) => {
  res.status(404);
  res.send('Not Found!');
});

const server = app.listen(3001, 'localhost', () => {
  const { address, port } = server.address();
  console.log(`Listening on http://localhost:${port}`);
});
