import { join } from 'path';
import express from 'express';
import jwt from 'express-jwt';
import graphql from 'express-graphql';
import { buildSchema } from 'graphql';
// import socket from 'socket.io';
import mongoose from 'mongoose';
import history from 'express-history-api-fallback';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { listRoutes } from './routes';
// import schema from './graphql';

const app = express();
const root = join(__dirname, '../public');

app.set('port', (process.env.PORT || 8000));
app.set('mongodb-uri', (process.env.MONGODB_URI || 'mongodb://web-go:web-go@ds133961.mlab.com:33961/web-go-demo'));
app.set('secret', process.env.SECRET || 'webgo');

mongoose.connect(app.get('mongodb-uri'));
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log('Connection Succeeded.'));

app.use(compression());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(jwt({
  secret: Buffer.from(app.get('secret'), 'base64'),
  credentialsRequired: false
}));

const schema = buildSchema(`
  type Query {
    helloWorld: String
  }
`);

app.use('/graphql', graphql(() => ({
  schema,
  graphiql: true,
  rootValue: {
    helloWorld() {
      return 'Hello World';
    }
  }
})));

app.use('/list', listRoutes);

app.use(express.static(root));
app.use(history('index.html', { root }));

/* const server = */app.listen(app.get('port'), () => {
  console.log('Bootstrap Succeeded.');
  console.log(`Port: ${app.get('port')}.`);
});

// const io = socket.listen(server);

export default app;
