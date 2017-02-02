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

console.log('------------------------------');

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

Observable::of(1, 2, 3)
  .subscribe(result => console.log(result));
  // 1
  // 2
  // 3

console.log('------------------------------');

import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

// Types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';
const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';
const DECREMENT_IF_EVEN = 'DECREMENT_IF_EVEN';

// Reducers
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    case RESET:
      return 0;
    default:
      return state;
  }
};

// Actions
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
const reset = () => ({ type: RESET });
const incrementIfOdd = () => ({ type: INCREMENT_IF_ODD });
const decrementIfEven = () => ({ type: DECREMENT_IF_EVEN });

// Epics
const incrementIfOddEpic = (action$, store) =>
  action$.ofType(INCREMENT_IF_ODD)
    ::filter(() => store.getState().counterReducer % 2 === 1)
    ::map(increment);

const decrementIfEvenEpic = (action$, store) =>
  action$.ofType(DECREMENT_IF_EVEN)
    ::filter(() => store.getState().counterReducer % 2 === 0)
    ::map(decrement);

const rootEpic = combineEpics(incrementIfOddEpic, decrementIfEvenEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);

// Store
const rootReducer = combineReducers({ counterReducer });
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

store.subscribe(() => {
  const { counterReducer } = store.getState();
  console.log(counterReducer);
});

store.dispatch(increment());
// 1

store.dispatch(incrementIfOdd());
// 1
// 2

store.dispatch(decrementIfEven());
// 2
// 1

store.dispatch(reset());
// 0

store.dispatch(decrement());
// -1

console.log('------------------------------');

import { Map } from 'immutable';

const client = Map({ name: 'Hale', age: 25 });

console.log(client.get('name'), client.get('age'));
// Hale 25
