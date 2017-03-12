# Backend Starter Kit (Beta)

:truck: A boilerplate for :star2: Node.js :star2:, Express, Mongoose, Heroku, mLab, Nodemon, PM2, and Babel.

[![Build Status](https://travis-ci.org/Shyam-Chen/Backend-Starter-Kit.svg?branch=master)](https://travis-ci.org/Shyam-Chen/Backend-Starter-Kit)
 //
[![Dependency Status](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit.svg)](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit)
[![devDependency Status](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit/dev-status.svg)](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit?type=dev)

[Live Demo](https://backend-starter-kit.herokuapp.com/)

This seed repository provides the following features:
* ---------- **Primary Key** ----------
* [x] Server-side platform with [**Node**](https://nodejs.org/en/).
* [x] Application framework with [**Express**](http://expressjs.com/).
* [x] Dadabase object modeling with [**Mongoose**](http://mongoosejs.com/).
* [x] Application cloud hosting with [**Heroku**](https://www.heroku.com/).
* [x] Dadabase cloud hosting with [**mLab**](https://mlab.com/).
* ---------- **Secondary Key** ----------
* [x] Utility functions with [**Lodash**](https://lodash.com/).
* [x] Reactive extensions with [**ReactiveX**](http://reactivex.io/).
* [x] Authentication with [**JWT**](https://jwt.io/).
* [x] Data query language with [**GraphQL**](http://graphql.org/).
* [x] Realtime application with [**Socket**](https://socket.io/).
* ---------- **Dev Tools** ----------
* [x] Automatically restart application with [**Nodemon**](https://github.com/remy/nodemon).
* [x] Keeping application alive with [**PM2**](https://github.com/Unitech/pm2).
* [x] Next generation JavaScript with [**Babel**](https://github.com/babel/babel).
* ---------- **Test Tools** ----------
* [x] Static code analyzer with [**ESLint**](https://github.com/eslint/eslint).
* [x] Test framework with [**Mocha**](https://github.com/mochajs/mocha).
* [x] Assertion library with [**Chai**](https://github.com/chaijs/chai).
* [x] Test spies with [**Sinon**](https://github.com/sinonjs/sinon).
* ---------- **Environment** ----------
* [x] Operating system with [**Linux**](https://github.com/torvalds/linux).
* [x] Text editor with [**Atom**](https://github.com/atom/atom).
* [x] Version control with [**Git**](https://github.com/git/git).
* [x] Fast and deterministic builds with [**Yarn**](https://github.com/yarnpkg/yarn).
* [ ] Reverse proxy and caching with [**Nginx**](https://github.com/nginx/nginx).
* [ ] Software container with [**Docker**](https://github.com/docker/docker).
* [ ] Continuous integration with [**Travis**](https://github.com/travis-ci/travis-ci).

## Table of Contents
* [Getting Started](#getting-started)
* [Dockerization](#dockerization)
* [Configuration](#configuration)
* [Using Libraries](#using-libraries)
* [All Commands](#all-commands)
* [Directory Structure](#directory-structure)
* [To-Do List](#to-do-list)

## Getting Started

1) Clone this Boilerplate

```bash
$ git clone --depth 1 https://github.com/Shyam-Chen/Backend-Starter-Kit.git <PROJECT_NAME>
$ cd <PROJECT_NAME>
```

2) Install Dependencies

```bash
$ yarn install
```

3) Run the Application

```bash
$ yarn start
```

4) Stay up-to-date

```bash
$ git remote add upstream https://github.com/Shyam-Chen/Backend-Starter-Kit.git
$ git pull upstream master
```

## Dockerization

1) Build the Image

```bash
$ docker build -t Backend-Starter-Kit .
```

2) Run the Container

```bash
$ docker run -it -p 8000:8000 --name app Backend-Starter-Kit
```

3) Just Compose

```bash
$ docker-compose up
```

## Configuration

Application configuration

```js
app.set('port', (process.env.PORT || 8000));
```

## Using Libraries

Example of Controller

```js
import express from 'express';
```

Example of Model

```js
import mongoose, { Schema } from 'mongoose';
```

Example of Lodash

```js
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { lowerFirst, pad } from 'lodash';

Observable::of(lowerFirst('Hello'), pad('World', 5))
  .subscribe(value => console.log(value));
  // hello
  // World
```

Example of ReactiveX

```js
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';
import { mapTo } from 'rxjs/operator/mapTo';
import { combineAll } from 'rxjs/operator/combineAll';

Observable::timer(2000)
  ::mapTo(Observable::of('Hello', 'World'))
  ::combineAll()
  .subscribe(value => console.log(value));
  // ["Hello"]
  // ["World"]
```

Example of JWT

```js
import jwt from 'express-jwt';
```

Example of GraphQL

```js
import graphql from 'express-graphql';
```

Example of Socket.IO

```js
import io from 'socket.io';

const socket = io.listen(server);

socket.on('connection', (client) => {
  console.log('Establish a connection');
  client.on('B', (message) => {
    console.log(message);
    socket.emit('A', 'A: Hi, B!');
  });
});
```

```js
const socket = io.connect('http://localhost:8000');

socket.on('connect', () => console.log('Accept a connection'));
socket.on('A', (message) => console.log(message));
socket.emit('B', 'B: What\'s up?');
```

## All Commands

```bash
$ yarn run dev
$ yarn run test
$ yarn run prod

$ yarn run clean
$ yarn run reset
$ yarn run reinstall
```

## Directory Structure

```
.
├── public
│   ├── favicon.ico
│   └── index.html
├── scripts
│   └── build|deploy|install|test.sh
├── src
│   ├── ctrls
│   │   └── index.js ...
│   ├── models
│   │   └── index.js ...
│   ├── routes
│   │   └── index.js ...
│   ├── types
│   │   └── index.js ...
│   ├── utils
│   │   └── index.js ...
│   ├── index.js
│   ├── schema.js
│   └── server.js
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

## To-Do List
* ...
