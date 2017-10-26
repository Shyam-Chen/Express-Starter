# Backend Starter Kit

:truck: A boilerplate for :star2: Node.js :star2:, Express, Mongoose, Heroku, mLab, Nodemon, PM2, and Babel.

[![Build Status](https://img.shields.io/circleci/project/Shyam-Chen/Backend-Starter-Kit/master.svg)](https://circleci.com/gh/Shyam-Chen/Backend-Starter-Kit)
[![Coverage Status](https://img.shields.io/codecov/c/github/Shyam-Chen/Backend-Starter-Kit/master.svg)](https://codecov.io/gh/Shyam-Chen/Backend-Starter-Kit)
 //
[![Dependency Status](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit.svg)](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit)
[![devDependency Status](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit/dev-status.svg)](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit?type=dev)

[Live Demo](https://web-go-demo.herokuapp.com/)

This seed repository provides the following features:

* ---------- **Essentials** ----------
* [x] Application framework with [**Express**](http://expressjs.com/).
* [x] Data query language with [**GraphQL**](http://graphql.org/).
* [x] Object document mapping with [**Mongoose**](http://mongoosejs.com/).
* [x] Object relational mapping with [**Sequelize**](http://docs.sequelizejs.com/).
* [x] Utility functions with [**Lodash**](https://lodash.com/).
* [x] Reactive extensions with [**ReactiveX**](http://reactivex.io/).
* [x] Secure authentication with [**JWT**](https://jwt.io/).
* [x] Third-party authentication with [**Passport**](http://passportjs.org/).
* [x] Real-time bidirectional communication with [**Socket**](https://socket.io/).
* [x] In-memory data structure store with [**Redis**](https://redis.io/).
* ---------- **Tools** ----------
* [x] Next generation JavaScript with [**Babel**](https://github.com/babel/babel).
* [x] JavaScript static code analyzer with [**ESLint**](https://github.com/eslint/eslint).
* [x] Type annotations with [**Flow**](https://github.com/facebook/flow).
* [x] Unit testing with [**Jest**](https://github.com/facebook/jest).
* [x] Automatically restart application with [**Nodemon**](https://github.com/remy/nodemon).
* [x] Keeping application alive with [**PM2**](https://github.com/Unitech/pm2).
* ---------- **Environments** ----------
* [x] Server-side platform with [**Node**](https://nodejs.org/).
* [x] Operating system with [**Linux**](https://github.com/torvalds/linux).
* [x] Text editor with [**Atom**](https://github.com/atom/atom).
* [x] Version control with [**Git**](https://github.com/git/git).
* [x] Code repository with [**GitHub**](https://github.com/).
* [x] Fast and deterministic builds with [**Yarn**](https://github.com/yarnpkg/yarn).
* [x] Cloud application hosting with [**Heroku**](https://www.heroku.com/).
* [x] Cloud NoSQL database hosting with [**mLab**](https://mlab.com/).
* [x] Cloud SQL database hosting with [**ElephantSQL**](https://www.elephantsql.com/).
* [x] Cloud memory cache hosting with [**RedisLabs**](https://redislabs.com/).
* [x] Error tracking with [**Sentry**](https://sentry.io/).
* [x] API workflow with [**Postman**](https://www.getpostman.com/).
* [x] Reverse proxy and caching with [**Nginx**](https://github.com/nginx/nginx).
* [x] Software container with [**Docker**](https://github.com/docker/docker).
* [x] Continuous integration with [**CircleCI**](https://circleci.com/).

## Table of Contents

* [Getting Started](#getting-started)
* [Dockerization](#dockerization)
* [Configuration](#configuration)
* [Using Libraries](#using-libraries)
* [All Commands](#all-commands)
* [Directory Structure](#directory-structure)

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
// src/config.js
export const PORT = process.env.PORT || 3000;

export const SECRET = process.env.SECRET || <PUT_YOUR_SECRET_HERE>;

export const MONGODB_URI = process.env.MONGODB_URI || <PUT_YOUR_MONGODB_URI_HERE>;
export const POSTGRES_URL = process.env.POSTGRES_URL || <PUT_YOUR_POSTGRES_URL_HERE>;

export const REDIS_PORT = process.env.REDIS_PORT || <PUT_YOUR_REDIS_PORT_HERE>;
export const REDIS_HOST = process.env.REDIS_HOST || <PUT_YOUR_REDIS_HOST_HERE>;
```

Development environments

```yml
# docker-compose.yml
version: '2'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - SECRET=<PUT_YOUR_SECRET_HERE>
      - MONGODB_URI=<PUT_YOUR_MONGODB_URI>
      - POSTGRES_URL=<PUT_YOUR_POSTGRES_URL_HERE>
      - REDIS_PORT=<PUT_YOUR_REDIS_PORT_HERE>
      - REDIS_HOST=<PUT_YOUR_REDIS_HOST_HERE>
    tty: true
```

Production environments

```dockerfile
# Dockerfile.prod
ENV SECRET <PUT_YOUR_SECRET_HERE>
ENV MONGODB_URI <PUT_YOUR_MONGODB_URI>
ENV POSTGRES_URL <PUT_YOUR_POSTGRES_URL_HERE>
ENV REDIS_PORT <PUT_YOUR_REDIS_PORT_HERE>
ENV REDIS_HOST <PUT_YOUR_REDIS_HOST_HERE>
```

## Using Libraries

1. Example of REST

2. Example of GraphQL

3. Example of Mongoose

4. Example of Sequelize

5. Example of Lodash

```js
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable';
import { lowerFirst, pad } from 'lodash';

Observable::of(lowerFirst('Hello'), pad('World', 5))
  .subscribe(value => console.log(value));
  // hello
  // World
```

6. Example of ReactiveX

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

7. Example of JWT

8. Example of Passport

9. Example of Socket

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

10. Example of Redis

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
