import * as express from 'express';
// import * as mongoose from 'mongoose';
const mongoose = require('mongoose');
import * as logger from 'morgan';
import { join } from 'path';

import { } from './routes';
import { } from './models';
import { title } from './controllers';

const app = express();

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(require('stylus').middleware(join(__dirname, 'public')));
app.use(express.static(join(__dirname, 'public')));

app.get('/', title);

app.use((req: any, res: any) => {
  res.status(404);
  res.send('Not Found!');
});

const server = app.listen(3000, 'localhost', () => {
  const { address, port } = server.address();
  console.log(`Listening on http://localhost:${port}`);
});
