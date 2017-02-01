import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(
  'mongodb://expressmongoose:expressmongoose@ds031167.mlab.com:31167/expressmongoose-starter-kit', {
    server: {socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }
  }
);

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => console.log('Connection Succeeded.'));

app.set('port', (process.env.PORT || 8000));

app.get('/', (req, res) => {
  res.send('Backend Starter Kit');
});

app.listen(app.get('port'), () => {
  console.log('Bootstrap Succeeded.');
  console.log(`Port: ${app.get('port')}.`);
});

// ------------------------------

import { partition } from 'lodash';

console.log(partition([1, 2, 3, 4], n => n % 2));
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

import { createStore } from 'redux';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
};

const store = createStore(counter);

store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: 'INCREMENT' });
// 1

store.dispatch({ type: 'INCREMENT' });
// 2

store.dispatch({ type: 'DECREMENT' });
// 1

// ------------------------------

import { Map } from 'immutable';

const client = Map({ name: 'Hale', age: 25 });

console.log(client.get('name'), client.get('age'));
// Hale 25
