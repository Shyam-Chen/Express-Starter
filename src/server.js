import { join } from 'path';
import express from 'express';
import mongoose from 'mongoose';
import prerender from 'prerender-node';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { route } from './routes';

const app = express();
mongoose.connect('mongodb://backend-sk:backend-sk@ds157258.mlab.com:57258/backend-starter-kit');

app.set('port', (process.env.PORT || 8000));

app.use(express.static(join(__dirname, '..', 'public')));
app.use(prerender);
app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(route);

app.listen(app.get('port'), () => {
  console.log('Bootstrap Succeeded.');
  console.log(`Port: ${app.get('port')}.`);
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.once('open', () => console.log('Connection Succeeded.'));
});
