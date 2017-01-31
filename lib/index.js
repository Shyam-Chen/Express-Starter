import express from 'express';
import mongoose from 'mongoose';

const app = express();

const dbuser = process.env.DBUSER || 'expressmongoose';
const dbpassword = process.env.DBPASSWORD || 'expressmongoose';
const dburl = process.env.DBURL || 'ds031167.mlab.com:31167/expressmongoose-starter-kit';
const mongodbUri = `mongodb://${dbuser}:${dbpassword}@${dburl}`;
const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }
};

mongoose.connect(mongodbUri, options);

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => console.log('Connection Succeeded.'));

app.set('port', (process.env.PORT || 8000));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log('Bootstrap Succeeded.');
  console.log(`Port: ${app.get('port')}.`);
});

// ------------------------------

import { partition } from 'lodash';

console.log( partition([1, 2, 3, 4], n => n % 2) );
// [ [ 1, 3 ], [ 2, 4 ] ]

// ------------------------------

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

Observable::of(1, 2, 3)
  .subscribe(result => console.log(result));
  // 1
  // 2
  // 3

// ------------------------------

import * as Immutable from 'immutable';

const client = Immutable.Map({ name: 'Hale', age: 25 });

console.log(client.get('name'), client.get('age'));
// Hale 25
