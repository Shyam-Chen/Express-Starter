# Express Play

:truck: A boilerplate for Node.js, Express, Mongoose, Heroku, mLab, Nodemon, PM2, and Babel.

[![Build Status](https://img.shields.io/circleci/project/github/Shyam-Chen/Express-Play/master.svg)](https://circleci.com/gh/Shyam-Chen/Express-Play)
[![Coverage Status](https://img.shields.io/codecov/c/github/Shyam-Chen/Express-Play/master.svg)](https://codecov.io/gh/Shyam-Chen/Express-Play)
 //
[![Dependency Status](https://img.shields.io/david/Shyam-Chen/Express-Play.svg)](https://david-dm.org/Shyam-Chen/Express-Play)
[![devDependency Status](https://img.shields.io/david/dev/Shyam-Chen/Express-Play.svg)](https://david-dm.org/Shyam-Chen/Express-Play?type=dev)

:rainbow: [Live Demo](https://backend-starter-kit.herokuapp.com/)

This seed repository provides the following features:

* ---------- **Essentials** ----------
* [x] Application routing with [**Express**](http://expressjs.com/).
* [x] Data query language with [**GraphQL**](http://graphql.org/).
* [x] Universal RPC with [**gRPC**](https://grpc.io/).
* [x] Object document mapping with [**Mongoose**](http://mongoosejs.com/).
* [x] Object relational mapping with [**Sequelize**](http://docs.sequelizejs.com/).
* [x] GraphQL SDL to model with [**Prisma**](https://www.prisma.io/).
* [x] Utility functions with [**Lodash**](https://lodash.com/).
* [x] Reactive extensions with [**ReactiveX**](http://reactivex.io/).
* [x] Authenticate requests with [**Passport**](http://passportjs.org/).
* [x] Real-time bidirectional communication with [**Socket.IO**](https://socket.io/).
* [x] In-memory data structure store with [**Redis**](https://redis.io/).
* [X] Multi-protocol messaging broker with [**RabbitMQ**](https://www.rabbitmq.com/).
* [x] Online payments with [**Stripe**](https://stripe.com/).
* [x] Machine learning with [**TensorFlow**](https://js.tensorflow.org/).
* [x] OpenAPI specification with [**Swagger**](https://swagger.io/).
* ---------- **Tools** ----------
* [x] Next generation JavaScript with [**Babel**](https://github.com/babel/babel).
* [x] JavaScript static code analyzer with [**ESLint**](https://github.com/eslint/eslint).
* [x] Unit testing with [**Jest**](https://github.com/facebook/jest).
* [x] End-to-End testing with [**Supertest**](https://github.com/visionmedia/supertest).
* [x] Test coverage integration with [**Codecov**](https://codecov.io/).
* [x] Automatically restart application with [**Nodemon**](https://github.com/remy/nodemon).
* [x] Keeping application alive with [**PM2**](https://github.com/Unitech/pm2).
* ---------- **Environments** ----------
* [x] JavaScript runtime with [**Node.js**](https://nodejs.org/).
* [x] Fast and deterministic builds with [**Yarn**](https://github.com/yarnpkg/yarn).
* [x] Version control with [**Git**](https://github.com/git/git).
* [x] Code repository with [**GitHub**](https://github.com/).
* [x] Cloud application hosting with [**Now.sh**](https://zeit.co/now).
* [x] Cloud NoSQL database hosting with [**mLab**](https://mlab.com/).
* [x] Cloud SQL database hosting with [**ElephantSQL**](https://www.elephantsql.com/).
* [x] Cloud memory cache hosting with [**RedisLabs**](https://redislabs.com/).
* [x] Cloud storage‎ hosting with [**Cloudinary**](https://cloudinary.com/).
* [x] Cloud message queue hosting with [**CloudAMQP**](https://www.cloudamqp.com/).
* [x] Log management service with [**LogDNA**](https://logdna.com/).
* [x] Error tracking service with [**Sentry**](https://sentry.io/).
* [x] Performance and security with [**Cloudflare**](https://www.cloudflare.com/).
* [x] Software container with [**Docker**](https://github.com/docker/docker).
* [x] Continuous integration with [**CircleCI**](https://circleci.com/).

Thinking in REST Stack / GraphQL Stack / Microservices.

## Table of Contents

* [Getting Started](#getting-started)
* [Dockerization](#dockerization)
* [Configuration](#configuration)
* [Using Libraries](#using-libraries)
* [Directory Structure](#directory-structure)

## Getting Started

Follow steps to execute this boilerplate.

1. Clone this boilerplate

```bash
$ git clone --depth 1 https://github.com/Shyam-Chen/Express-Play.git <PROJECT_NAME>
$ cd <PROJECT_NAME>
```

2. Install dependencies

```bash
$ yarn install
```

3. Start a local server

```bash
$ yarn start
```

4. Compile code

```bash
$ yarn build
```

5. Check code quality

```bash
$ yarn lint
```

6. Runs unit tests

```bash
$ yarn unit
```

7. Runs end-to-end tests

```bash
$ yarn e2e
```

## Dockerization

Dockerize an application.

1. Build and run the container in the background

```bash
$ docker-compose up -d app
```

2. Run a command in a running container

```bash
$ docker-compose exec app <COMMAND>
```

3. Remove the old container before creating the new one

```bash
$ docker-compose rm -fs
```

4. Restart up the container in the background

```bash
$ docker-compose up -d --build app
```

5. Push images to Docker Cloud

```diff
# .gitignore

  .DS_Store
  node_modules
  dist
  coverage
+ dev.Dockerfile
+ stage.Dockerfile
+ prod.Dockerfile
  *.log
```

```bash
$ docker login
$ docker build -f ./tools/<dev|stage|prod>.Dockerfile -t <IMAGE_NAME>:<IMAGE_TAG> .

# checkout
$ docker images

$ docker tag <IMAGE_NAME>:<IMAGE_TAG> <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>
$ docker push <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>

# remove
$ docker rmi <REPOSITORY>:<TAG>
# or
$ docker rmi <IMAGE_ID>
```

6. Pull images from Docker Cloud

```diff
# circle.yml

  echo "${HEROKU_TOKEN}" | docker login -u "${HEROKU_USERNAME}" --password-stdin registry.heroku.com
- docker build -f ./tools/$DEPLOYMENT_ENVIRONMENT.Dockerfile -t $APP_NAME .
+ docker pull <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>
- docker tag $APP_NAME registry.heroku.com/$APP_NAME/web
+ docker tag <IMAGE_NAME>:<IMAGE_TAG> registry.heroku.com/<HEROKU_PROJECT>/web
  docker push registry.heroku.com/<HEROKU_PROJECT>/web
```

## Configuration

### Default environments

Set your local environment variables.

```js
// src/env.js

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const HOST = process.env.HOST || '0.0.0.0';
export const PORT = process.env.PORT || 3000;

export const SECRET = process.env.SECRET || 'PUT_YOUR_SECRET_HERE';

export const MONGODB_URI = process.env.MONGODB_URI || '<PUT_YOUR_MONGODB_URI_HERE>';
export const POSTGRES_URL = process.env.POSTGRES_URL || 'PUT_YOUR_POSTGRES_URL_HERE';

export const REDIS_PORT = process.env.REDIS_PORT || '<PUT_YOUR_REDIS_PORT_HERE>';
export const REDIS_HOST = process.env.REDIS_HOST || '<PUT_YOUR_REDIS_HOST_HERE>';

// ...
```

### Deployment environments

Set your deployment environment variables.

```dockerfile
# tools/<dev|stage|prod>.Dockerfile

# envs --
ENV SECRET <PUT_YOUR_SECRET_HERE>

ENV MONGODB_URI <PUT_YOUR_MONGODB_URI>
ENV POSTGRES_URL <PUT_YOUR_POSTGRES_URL_HERE>

ENV REDIS_PORT <PUT_YOUR_REDIS_PORT_HERE>
ENV REDIS_HOST <PUT_YOUR_REDIS_HOST_HERE>

# ...
# -- envs
```

## Using Libraries

1. Example of REST

```js
import { Router } from 'express';

import { List } from './document';

const router = Router();

router.get('/', async (req, res) => {
  const data = await List.find({}).exec();
  res.json(data);
});

export default router;
```

2. Example of GraphQL

```js
import gql from 'graphql-tag';

import { List } from './document';

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
    async list(root, { _id, text }) {
      const data = await List.find({}).exec();
      return data;
    },
  },
};
```

3. Example of Document

```js
import mongoose, { Schema } from 'mongoose';

const listSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

export const List = mongoose.model('List', listSchema);
```

4. Example of Relational

```js
import Sequelize from 'sequelize';

import sequelize from '~/core/sequelize';

export const RelationalList = sequelize.define('List', {
  text: Sequelize.STRING,
});
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
connSocket.emit('A', { foo: 'bar' });
connSocket.on('B', data => console.log(data));  // { foo: 'baz' }
```

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js"></script>
<script>
const socket = io('http://localhost:3000/');

socket.on('connect', () => console.log('Socket: Accept a connection.'));

socket.on('A', (data) => {
  console.log(data);  // { foo: 'bar' }
  socket.emit('B', { foo: 'baz' });
});
</script>
```

8. Example of Redis

```js
import redis from '~/core/redis';

redis.hmset('thing', {
  foo: 'js',
  bar: 'html',
  baz: 'css',
});

redis.hgetall('thing', (err, object) => {
  console.log(object);
});
```

## Directory Structure

The structure follows the LIFT Guidelines.

```coffee
.
├── src
│   ├── core  -> core feature module
│   ├── <FEATURE>  -> feature modules
│   │   ├── __tests__
│   │   │   ├── <FEATURE>.e2e-spec.js
│   │   │   └── <FEATURE>.spec.js
│   │   ├── _<THING>  -> feature of private things
│   │   │   └── ...
│   │   └── <FEATURE>.js
│   ├── <GROUP>  -> module group
│   │   └── <FEATURE>  -> feature modules
│   │       ├── __tests__
│   │       │   ├── <FEATURE>.e2e-spec.js
│   │       │   └── <FEATURE>.spec.js
│   │       ├── _<THING>  -> feature of private things
│   │       │   └── ...
│   │       └── <FEATURE>.js
│   ├── shared  -> shared feature module
│   ├── app.js
│   └── env.js
├── tools
│   └── ...
├── .babelrc
├── .editorconfig
├── .eslintrc
├── .gitignore
├── Dockerfile
├── LICENSE
├── README.md
├── circle.yml
├── docker-compose.yml
├── jest.config.js
├── package.json
├── processes.js
└── yarn.lock
```
