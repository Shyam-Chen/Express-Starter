# Backend Starter Kit (Beta)

:truck: A boilerplate for :star2: Node.js :star2:, Express, Mongoose, Heroku, mLab, Nodemon, PM2, and Babel.

[![Build Status](https://travis-ci.org/Shyam-Chen/Backend-Starter-Kit.svg?branch=master)](https://travis-ci.org/Shyam-Chen/Backend-Starter-Kit)
 //
[![Dependency Status](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit.svg)](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit)
[![devDependency Status](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit/dev-status.svg)](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit?type=dev)

[Live Demo](https://web-go-demo.herokuapp.com/)

This seed repository provides the following features:

* ---------- **Primary Key** ----------
* [x] Server-side platform with [**Node**](https://nodejs.org/en/).
* [x] Application framework with [**Express**](http://expressjs.com/).
* [x] Database object modeling with [**Mongoose**](http://mongoosejs.com/).
* [x] Application cloud hosting with [**Heroku**](https://www.heroku.com/).
* [x] Database cloud hosting with [**mLab**](https://mlab.com/).
* ---------- **Secondary Key** ----------
* [x] Utility functions with [**Lodash**](https://lodash.com/).
* [x] Reactive extensions with [**ReactiveX**](http://reactivex.io/).
* [x] Secure authentication with [**JWT**](https://jwt.io/).
* [x] Data query language with [**GraphQL**](http://graphql.org/).
* [x] Real-time bidirectional communication with [**Socket**](https://socket.io/).
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

1) Build and run the Container

```bash
$ docker-compose up
```

2) Run a command in a running container

```bash
$ docker-compose exec app <COMMAND>
```

## Configuration

Application configuration

```js
app.set('port', (process.env.PORT || 8000));
app.set('database', (process.env.MONGODB_URI || 'mongodb://backend-go:backend-go@ds113871.mlab.com:13871/backend-go-demo'));
```

## Using Libraries

Example of Route

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

Example of Socket

```js
import io from 'socket.io';

const socket = io.listen(server);

socket.on('connection', (client) => {
  console.log('Establish a connection');
  client.on('B', message => {
    console.log(message);
    socket.emit('A', 'A: Hi, B!');
  });
});
```

```js
const socket = io.connect('http://localhost:8000');

socket.on('connect', () => console.log('Accept a connection'));
socket.on('A', message => console.log(message));
socket.emit('B', 'B: What\'s up?');
```

The practical examples:

* [Authentication - Google OAuth 2.0](https://github.com/Shyam-Chen/Backend-Starter-Kit/tree/auth-google)
* [Datastore - CRUD data stored](https://github.com/Shyam-Chen/Backend-Starter-Kit/tree/rest)
* [Storage - Store images](https://github.com/Shyam-Chen/Backend-Starter-Kit/tree/rest)
* Notification - Send email
* [Payment - PayPal REST](https://github.com/Shyam-Chen/Backend-Starter-Kit/tree/paypal-rest-sdk)

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
├── public  -> client-side rules ...
├── scripts  -> shell scripts ...
├── src
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

## Known Issues

* ---------- **P0: Critical** ----------
* ...
* ---------- **P1: Urgent** ----------
* ...
* ---------- **P2: Required** ----------
* ...
* ---------- **P3: Important** ----------
* ...
* ---------- **P4: Nice to have** ----------
* ...
