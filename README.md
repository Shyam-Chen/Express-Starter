# Backend Starter Kit (Beta)

:truck: A boilerplate for :star2: Node.js :star2:, Express, Mongoose, Heroku, mLab, Nodemon, PM2, and Babel.

[![Build Status](https://travis-ci.org/Shyam-Chen/Backend-Starter-Kit.svg?branch=master)](https://travis-ci.org/Shyam-Chen/Backend-Starter-Kit)
 //
[![Dependency Status](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit.svg)](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit)
[![devDependency Status](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit/dev-status.svg)](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit?type=dev)

[Live Demo](https://web-go-demo.herokuapp.com/)

This seed repository provides the following features:

* ---------- **Essentials** ----------
* [x] Application framework with [**Express**](http://expressjs.com/).
* [x] Database object modeling with [**Mongoose**](http://mongoosejs.com/).
* [x] Utility functions with [**Lodash**](https://lodash.com/).
* [x] Reactive extensions with [**ReactiveX**](http://reactivex.io/).
* [x] Secure authentication with [**JWT**](https://jwt.io/).
* [x] Data query language with [**GraphQL**](http://graphql.org/).
* [x] Real-time bidirectional communication with [**Socket**](https://socket.io/).
* [x] Message queuing with [**RabbitMQ**](https://www.rabbitmq.com/).
* ---------- **Tools** ----------
* [x] Automatically restart application with [**Nodemon**](https://github.com/remy/nodemon).
* [x] Keeping application alive with [**PM2**](https://github.com/Unitech/pm2).
* [x] ES modules with [**Babel**](https://github.com/babel/babel).
* [x] Type annotations with [**Flow**](https://github.com/facebook/flow).
* [x] Static code analyzer with [**ESLint**](https://github.com/eslint/eslint).
* [x] Testing framework with [**Jest**](https://github.com/facebook/jest).
* ---------- **Environments** ----------
* [x] Server-side platform with [**Node**](https://nodejs.org/en/).
* [x] Operating system with [**Linux**](https://github.com/torvalds/linux).
* [x] Text editor with [**Atom**](https://github.com/atom/atom).
* [x] Version control with [**Git**](https://github.com/git/git).
* [x] Fast and deterministic builds with [**Yarn**](https://github.com/yarnpkg/yarn).
* [x] Application cloud hosting with [**Heroku**](https://www.heroku.com/).
* [x] Database cloud hosting with [**mLab**](https://mlab.com/).
* [x] Message queuing cloud hosting with [**CloudAMQP**](https://www.cloudamqp.com/).
* [x] Reverse proxy and caching with [**Nginx**](https://github.com/nginx/nginx).
* [x] Software container with [**Docker**](https://github.com/docker/docker).
* [x] Continuous integration with [**Travis**](https://github.com/travis-ci/travis-ci).

## Table of Contents

* [Getting Started](#getting-started)
* [Dockerization](#dockerization)
* [Configuration](#configuration)
* [Using Libraries](#using-libraries)
* [All Commands](#all-commands)
* [Directory Structure](#directory-structure)
* [Known Issues](#known-issues)

## Getting Started

1. Clone this Boilerplate

```bash
$ git clone --depth 1 https://github.com/Shyam-Chen/Backend-Starter-Kit.git <PROJECT_NAME>
$ cd <PROJECT_NAME>
```

2. Install Dependencies

```bash
$ yarn install
```

3. Run the Application

```bash
$ yarn start
```

4. Run the Test

```bash
$ yarn test
```

5. Stay up-to-date

```bash
$ git remote add upstream https://github.com/Shyam-Chen/Backend-Starter-Kit.git
$ git pull upstream master
```

6. Usage the Mongo Shell

```bash
$ mongo ds133961.mlab.com:33961/web-go-demo -u web-go -p web-go
```

## Dockerization

1. Build and run the Container

```bash
$ docker-compose up
```

2. Run a command in a running container

```bash
$ docker-compose exec app <COMMAND>
```

3. Remove the old container before creating the new one

```bash
$ docker-compose rm -fs
```

## Configuration

Application configuration

```js
app.set('port', (process.env.PORT || 3000));
app.set('mongodb-uri', (process.env.MONGODB_URI || 'mongodb://web-go:web-go@ds133961.mlab.com:33961/web-go-demo'));
app.set('secret', process.env.SECRET || 'webgo');
```

## Using Libraries

1. Example of Route

```js
import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  // ...
});

export const thingRoutes = router;
```

2. Example of Model

```js
import mongoose, { Schema } from 'mongoose';

const thingSchema = Schema({
  // ...
});

export const Thing = mongoose.model('Thing', thingSchema);

```

3. Example of Lodash

```js
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable';
import { lowerFirst, pad } from 'lodash';

Observable::of(lowerFirst('Hello'), pad('World', 5))
  .subscribe(value => console.log(value));
  // hello
  // World
```

4. Example of ReactiveX

```js
import { Observable } from 'rxjs';
import { timer, of } from 'rxjs/observable';
import { mapTo, combineAll } from 'rxjs/operator';

Observable::timer(2000)
  ::mapTo(Observable::of('Hello', 'World'))
  ::combineAll()
  .subscribe(value => console.log(value));
  // ["Hello"]
  // ["World"]
```

5. Example of JWT

```js
import jwt from 'express-jwt';

app.set('secret', process.env.SECRET || 'webgo');
```

```js
req.app.get('secret');
```

6. Example of GraphQL

```js
import graphql from 'express-graphql';

app.use('/__/graphql', graphql(() => ({
  schema,
  rootValue,
  graphiql: true
})));
```

```html
<script>
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/__/graphql');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onload = () => console.log('GraphQL:', xhr.response);
  xhr.send(JSON.stringify({ query: '{ helloWorld }' }));
</script>
```

7. Example of Socket

```js
import socket from 'socket.io';

const io = socket.listen(server);

io.on('connection', socket => {
  console.log('WS: Establish a connection.');
  socket.on('disconnect', () => console.log('WS: Disconnected'));

  socket.emit('A', { foo: 'bar' });
  socket.on('B', data => console.log(data));  // { foo: 'baz' }
});
```

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script>
<script>
  const socket = io();

  socket.on('connect', () => console.log('WS: Accept a connection.'));

  socket.on('A', data => {
    console.log(data);  // { foo: 'bar' }
    socket.emit('B', { foo: 'baz' });
  });
</script>
```

## All Commands

```bash
$ yarn build

$ yarn lint
$ yarn unit

$ yarn reset
$ yarn reinstall

$ yarn deploy
```

## Directory Structure

```
.
├── dist  -> server-side rules ...
├── public  -> client-side rules ...
├── scripts  -> shell scripts ...
├── src
│   ├── graphql
│   │   └── index.js ...
│   ├── models
│   │   └── index.js ...
│   ├── routes
│   │   └── index.js ...
│   ├── utils
│   │   └── index.js ...
│   ├── app.js
│   └── pm2.js
├── test
│   └── test.js ...
├── .babelrc
├── .editorconfig
├── .eslintrc
├── .gitattributes
├── .gitignore
├── .travis.yml
├── Dockerfile
├── LICENSE
├── Procfile
├── README.md
├── docker-compose.yml
├── nginx.conf
├── package.json
└── yarn.lock
```

## Known Issues

* ---------- **P0: Critical** ----------
* Deploy the application in Docker containers
* Push Docker image to Heroku
* The server can not be closed under unit tests
* ---------- **P1: Urgent** ----------
* ...
* ---------- **P2: Required** ----------
* Do more examples
* Write more tests
* ---------- **P3: Important** ----------
* ...
* ---------- **P4: Nice to have** ----------
* ...
