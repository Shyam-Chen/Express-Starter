# Backend Starter Kit

:truck: A boilerplate for Node.js, Express, Mongoose, Heroku, mLab, Nodemon, PM2, and Babel.

[![Build Status](https://img.shields.io/circleci/project/Shyam-Chen/Backend-Starter-Kit/master.svg)](https://circleci.com/gh/Shyam-Chen/Backend-Starter-Kit)
[![Coverage Status](https://img.shields.io/codecov/c/github/Shyam-Chen/Backend-Starter-Kit/master.svg)](https://codecov.io/gh/Shyam-Chen/Backend-Starter-Kit)
 //
[![Dependency Status](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit.svg)](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit)
[![devDependency Status](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit/dev-status.svg)](https://david-dm.org/Shyam-Chen/Backend-Starter-Kit?type=dev)

[Live Demo](https://web-go-demo.herokuapp.com/)

This seed repository provides the following features:

* ---------- **Essentials** ----------
* [x] API routing with [**Express**](http://expressjs.com/).
* [x] Data query language with [**GraphQL**](http://graphql.org/).
* [x] Object document mapping with [**Mongoose**](http://mongoosejs.com/).
* [x] Object relational mapping with [**Sequelize**](http://docs.sequelizejs.com/).
* [x] Utility functions with [**Lodash**](https://lodash.com/).
* [x] Reactive extensions with [**ReactiveX**](http://reactivex.io/).
* [x] Secure authentication with [**JWT**](https://jwt.io/).
* [x] Authenticate requests with [**Passport**](http://passportjs.org/).
* [x] Real-time bidirectional communication with [**Socket**](https://socket.io/).
* [x] In-memory data structure store with [**Redis**](https://redis.io/).
* ---------- **Tools** ----------
* [x] Next generation JavaScript with [**Babel**](https://github.com/babel/babel).
* [x] JavaScript static code analyzer with [**ESLint**](https://github.com/eslint/eslint).
* [x] Type annotations with [**Flow**](https://github.com/facebook/flow).
* [x] Unit testing with [**Jest**](https://github.com/facebook/jest).
* [x] HTTP testing with [**Supertest**](https://github.com/visionmedia/supertest).
* [x] Test coverage integration with [**Codecov**](https://codecov.io/).
* [x] Automatically restart application with [**Nodemon**](https://github.com/remy/nodemon).
* [x] Keeping application alive with [**PM2**](https://github.com/Unitech/pm2).
* [x] Error tracking with [**Sentry**](https://sentry.io/).
* [x] API workflow with [**Insomnia**](https://insomnia.rest/).
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
* [x] Cloud Storage‎ hosting with [**Cloudinary**](https://cloudinary.com/).
* [x] Cloud memory cache hosting with [**RedisLabs**](https://redislabs.com/).
* [x] Monitoring service with [**UptimeRobot**](https://uptimerobot.com/).
* [x] Log management service with [**Papertrail**](https://papertrailapp.com/).
* [x] Performance and security with [**Cloudflare**](https://www.cloudflare.com/).
* [x] Software container with [**Docker**](https://github.com/docker/docker).
* [x] Continuous integration with [**CircleCI**](https://circleci.com/).

Here are some related seed repositories:

* ---------- **Client-side** ----------
* [Frontend Starter Kit](https://github.com/Shyam-Chen/Frontend-Starter-Kit) - Make for Progressive Web Apps.
* [Cordova Phonegap Starter](https://github.com/Shyam-Chen/Cordova-Phonegap-Starter) - Make for Cross-platform Mobile Apps.
* [Electron Chromium Starter](https://github.com/Shyam-Chen/Electron-Chromium-Starter) - Make for Cross-platform Desktop Apps.
* ---------- **Server-side** ----------
* [Backend Starter Kit](https://github.com/Shyam-Chen/Backend-Starter-Kit) - Make for Flexible Cloud Platform.
* [Firebase Functions Starter](https://github.com/Shyam-Chen/Firebase-Functions-Starter) - Make for Serverless Cloud Functions.
* [Kubernetes Engine Starter](https://github.com/Shyam-Chen/Kubernetes-Engine-Starter) - Make for Containerized Cloud Infrastructure.

## Table of Contents

* [Getting Started](#getting-started)
* [Dockerization](#dockerization)
* [Configuration](#configuration)
* [Using Libraries](#using-libraries)
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

# install flow types
$ yarn typed
```

3. Run the Application

```bash
$ yarn start
```

4. Test the Application

```bash
$ yarn test
```

5. Build the Application

```bash
$ yarn build
```

## Dockerization

1. Build and run the Container

```bash
$ docker-compose up
```

2. Run a command in a running container

```bash
$ docker-compose exec api <COMMAND>
```

3. Remove the old container before creating the new one

```bash
$ docker-compose rm -fs
```

4. Restart up the container in the background

```bash
$ docker-compose up -d --build <SERVICE>
```

## Configuration

### Default environments

Set your local environment variables.

```js
// src/env.js
export const SECRET = process.env.SECRET || <PUT_YOUR_SECRET_HERE>;
export const MONGODB_URI = process.env.MONGODB_URI || <PUT_YOUR_MONGODB_URI_HERE>;
export const POSTGRES_URL = process.env.POSTGRES_URL || <PUT_YOUR_POSTGRES_URL_HERE>;
export const REDIS_PORT = process.env.REDIS_PORT || <PUT_YOUR_REDIS_PORT_HERE>;
export const REDIS_HOST = process.env.REDIS_HOST || <PUT_YOUR_REDIS_HOST_HERE>;
export const SENTRY_DSN = process.env.SENTRY_DSN || <PUT_YOUR_SENTRY_DSN_HERE>;
```

### Deployment environments

Set your deployment environment variables.

```dockerfile
# Dockerfile.<dev|prod>
ENV SECRET <PUT_YOUR_SECRET_HERE>
ENV MONGODB_URI <PUT_YOUR_MONGODB_URI>
ENV POSTGRES_URL <PUT_YOUR_POSTGRES_URL_HERE>
ENV REDIS_PORT <PUT_YOUR_REDIS_PORT_HERE>
ENV REDIS_HOST <PUT_YOUR_REDIS_HOST_HERE>
ENV SENTRY_DSN <PUT_YOUR_SENTRY_DSN_HERE>
```

## Using Libraries

1. Example of REST

```js
import { Router } from 'express';

import { List } from '~/document';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await List.find({}).exec();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
```

2. Example of GraphQL

```js
import gql from 'graphql-tag';

import { List } from '~/document';

export const listTypeDefs = gql`
  type List {
    _id: ID!
    text: String!
  }

  type Query {
    list: [List]
  }
`;

export const listResolvers = {
  Query: {
    async list(root, { text }) {
      try {
        const data = await List.find({}).exec();
        return data;
      } catch (err) {
        console.error(err);
      }
    }
  }
};
```

3. Example of Document

```js
import mongoose, { Schema } from 'mongoose';

const listSchema = Schema({
  text: String,
});

export const List = mongoose.model('List', listSchema);
```

4. Example of Relational

```js
export default (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    text: DataTypes.STRING
  });

  return List;
};
```

5. Example of Lodash

```js
import { of } from 'rxjs';
import { lowerFirst, pad } from 'lodash';

of(lowerFirst('Hello'), pad('World', 5))
  .subscribe(value => console.log(value));
  // hello
  // World
```

6. Example of ReactiveX

```js
import { timer, of } from 'rxjs';
import { mapTo, combineAll } from 'rxjs/operators';

timer(2000)
  .pipe(
    mapTo(of('Hello', 'World')),
    combineAll(),
  )
  .subscribe(value => console.log(value));
  // ["Hello"]
  // ["World"]
```

7. Example of Socket

```js
import { io } from '~/core/socket';

io.emit('A', { foo: 'bar' });
io.on('B', data => console.log(data));  // { foo: 'baz' }
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

8. Example of Redis

```js
import { client } from '~/core/redis';

client.hmset('thing', {
  foo: 'js',
  bar: 'html',
  baz: 'css'
});

client.hgetall('thing', (err, object) => {
  console.log(object);
});
```

## Directory Structure

```coffee
.
├── src
│   ├── core  -> core feature module
│   ├── document  -> mongodb models
│   ├── graphql  -> query language
│   ├── relational  ->  postgresql models
│   ├── rest  -> restful api
│   ├── shared  -> shared feature module
│   ├── api.js
│   └── env.js
├── test  -> e2e testing
│   ├── graphql
│   │   └── <api>.spec.js
│   └── rest
│       └── <api>.spec.js
├── .babelrc
├── .editorconfig
├── .eslintrc
├── .flowconfig
├── .gitattributes
├── .gitignore
├── Dockerfile
├── Dockerfile.dev
├── Dockerfile.prod
├── LICENSE
├── README.md
├── circle.yml
├── docker-compose.yml
├── package.json
├── processes.js
└── yarn.lock
```
