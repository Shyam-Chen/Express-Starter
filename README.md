# Express Starter

:truck: A boilerplate for Node.js, Express, Mongoose, Heroku, Atlas, Nodemon, PM2, and Babel.

[![Build Status](https://img.shields.io/circleci/project/github/Shyam-Chen/Express-Starter/master.svg)](https://circleci.com/gh/Shyam-Chen/Express-Starter)
[![Coverage Status](https://img.shields.io/codecov/c/github/Shyam-Chen/Express-Starter/master.svg)](https://codecov.io/gh/Shyam-Chen/Express-Starter)
//
[![Dependency Status](https://img.shields.io/david/Shyam-Chen/Express-Starter.svg)](https://david-dm.org/Shyam-Chen/Express-Starter)
[![devDependency Status](https://img.shields.io/david/dev/Shyam-Chen/Express-Starter.svg)](https://david-dm.org/Shyam-Chen/Express-Starter?type=dev)

:rainbow: [Live Demo](https://backend-starter-kit.herokuapp.com/)

This seed repository provides the following features:

- ---------- **Essentials** ----------
- [x] Application routing with [**Express**](http://expressjs.com/).
- [x] Industry-standard GraphQL implementation with [**Apollo**](https://www.apollographql.com/).
- [x] Object-document mapping with [**Mongoose**](http://mongoosejs.com/).
- [x] Object-relational mapping with [**Sequelize**](http://docs.sequelizejs.com/).
- [x] Authenticated request with [**Passport**](http://passportjs.org/).
- [x] File upload with [**Multer**](https://github.com/expressjs/multer).
- [x] Real-time communication with [**WS**](https://github.com/websockets/ws).
- [x] PubSub systems with [**GraphQL Subscriptions**](https://github.com/apollographql/graphql-subscriptions).
- [x] In-memory data structure store with [**Redis**](https://redis.io/).
- ---------- **Tools** ----------
- [x] Next generation JavaScript with [**Babel**](https://github.com/babel/babel).
- [x] JavaScript static code analyzer with [**ESLint**](https://github.com/eslint/eslint).
- [x] Code formatter with [**Prettier**](https://prettier.io/).
- [x] Unit testing with [**Jest**](https://github.com/facebook/jest).
- [x] End-to-End testing with [**Supertest**](https://github.com/visionmedia/supertest).
- [x] Mocking external requests with [**Nock**](https://github.com/nock/nock).
- [x] Automatically restart application with [**Nodemon**](https://github.com/remy/nodemon).
- [x] Keeping application alive with [**PM2**](https://github.com/Unitech/pm2).
- [x] Reverse proxy with [**Caddy**](https://caddyserver.com/).
- ---------- **Environments** ----------
- [x] Cloud application hosting with [**Heroku**](https://www.heroku.com/).
- [x] Cloud NoSQL database hosting with [**Atlas**](https://www.mongodb.com/cloud/atlas).
- [x] Cloud SQL database hosting with [**ElephantSQL**](https://www.elephantsql.com/).
- [x] Cloud storage‎ hosting with [**Cloudinary**](https://cloudinary.com/).
- [x] Cloud memory cache hosting with [**RedisLabs**](https://redislabs.com/).
- [x] Error tracking service with [**Sentry**](https://sentry.io/).
- [x] Software container with [**Docker**](https://github.com/docker/docker).
- [x] Continuous integration with [**CircleCI**](https://circleci.com/).
- [x] Test coverage integration with [**Codecov**](https://codecov.io/).

Thinking in ...

- [x] REST Stack
- [x] GraphQL Stack

## Table of Contents

- [Getting Started](#getting-started)
- [Dockerization](#dockerization)
- [Configuration](#configuration)
- [Examples](#examples)
- [Directory Structure](#directory-structure)
- [Microservices](#microservices)

## Getting Started

Follow steps to execute this boilerplate.

1. Clone this boilerplate

```bash
$ git clone --depth 1 https://github.com/Shyam-Chen/Express-Starter.git <PROJECT_NAME>
$ cd <PROJECT_NAME>
```

2. Install dependencies

```bash
$ npm install
```

3. Start a development server

```bash
$ yarn serve
```

4. Produce a production-ready bundle

```bash
$ yarn build
```

5. Lint and fix files

```bash
$ yarn lint
```

6. Run unit tests

```bash
$ yarn unit
```

7. Run end-to-end tests

```bash
$ yarn e2e
```

- MongoDB

```sh
$ brew tap mongodb/brew
$ brew install mongodb-community
$ mongo --version
# MongoDB shell version v4.4.1
# Build Info: {
#     "version": "4.4.1",
#     "gitVersion": "ad91a93a5a31e175f5cbf8c69561e788bbc55ce1",
#     "modules": [],
#     "allocator": "system",
#     "environment": {
#         "distarch": "x86_64",
#         "target_arch": "x86_64"
#     }
# }
```

```sh
# Starting MongoDB
$ brew services run mongodb-community
$ brew services list

# Stopping MongoDB
$ brew services stop mongodb-community
```

- PostgreSQL

```sh
$ brew install postgresql
$ psql --version
# psql (PostgreSQL) 13.1

$ brew services start postgresql
$ brew services list
```

```sh
$ psql postgres
```

```sh
CREATE DATABASE test;
CREATE USER tester WITH PASSWORD '123' CREATEDB;

# get a list of all databases
\l

# connect
\c test

# exit
\q
```

```sh
$ brew services stop postgresql
```

- Redis

```sh
$ brew install redis

$ brew services start redis
$ brew services list

$ redis-cli ping
# PONG
```

```sh
$ brew services stop redis
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

Local Databases

```bash
$ docker-compose up -d mongodb postgresql redis
```

## Configuration

Control the environment.

### Default environments

Set your local environment variables.

```js
// src/env.js

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const INDEX_NAME = process.env.INDEX_NAME || 'local';

export const HOST = process.env.HOST || '0.0.0.0';
export const PORT = process.env.PORT || 3000;

// ---

export const SECRET_KEY = process.env.SECRET_KEY || 'jbmpHPLoaV8N0nEpuLxlpT95FYakMPiu';

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';
export const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://tester:123@127.0.0.1:5432/test';
export const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379/4';

// ---

export const CLOUDINARY_URL = process.env.CLOUDINARY_URL || 'cloudinary://key:secret@domain_name';

export const RATE_LIMIT = process.env.RATE_LIMIT || 0;

export const SENTRY_DSN = process.env.SENTRY_DSN || null;
```

### Continuous integration environments

Add environment variables to the CircleCI build.

```sh
# Project Settings > Environment Variables > Add Environment Variable

SECRET_KEY

MONGODB_URI
POSTGRES_URL
REDIS_URL

SENTRY_DSN
```

## Examples

- [Hello World](./src/hello-world)
- [CRUD Operations](./src/crud-operations)
- [Authentication](./src/authentication)
- [File Uploads](./src/file-uploads)
- [Realtime Data](./src/realtime-data)

## Directory Structure

The structure follows the LIFT Guidelines.

```coffee
.
├── src
│   ├── core
│   │   └── ...
│   ├── <FEATURE> -> feature modules
│   │   ├── __tests__
│   │   │   ├── controller.spec.js
│   │   │   ├── resolver.spec.js
│   │   │   ├── collection.spec.js
│   │   │   ├── table.spec.js
│   │   │   ├── service.spec.js
│   │   │   ├── rest.e2e-spec.js
│   │   │   └── graphql.e2e-spec.js
│   │   ├── controller.js -> rest controller
│   │   ├── resolver.js -> graphql resolver
│   │   ├── collection.js -> mongodb odm
│   │   ├── table.js -> postgresql orm
│   │   ├── service.js -> provider
│   │   └── index.js
│   ├── <GROUP> -> module group
│   │   └── <FEATURE> -> feature modules
│   │       ├── __tests__
│   │       │   ├── controller.spec.js
│   │       │   ├── resolver.spec.js
│   │       │   ├── collection.spec.js
│   │       │   ├── table.spec.js
│   │       │   ├── service.spec.js
│   │       │   ├── rest.e2e-spec.js
│   │       │   └── graphql.e2e-spec.js
│   │       ├── controller.js -> rest controller
│   │       ├── resolver.js -> graphql resolver
│   │       ├── collection.js -> mongodb odm
│   │       ├── table.js -> postgresql orm
│   │       ├── service.js -> provider
│   │       └── index.js
│   ├── shared
│   │   └── ...
│   ├── app.js
│   ├── env.js
│   └── server.js
├── tools
│   └── ...
├── .editorconfig
├── .eslintrc
├── .gitignore
├── .prettierrc
├── babel.config
├── Caddyfile
├── circle.yml
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── LICENSE
├── package-lock.json
├── package.json
├── processes.js
└── README.md
```

## Microservices

> Microservice architecture – a variant of the service-oriented architecture structural style – arranges an application as a collection of loosely coupled services. In a microservices architecture, services are fine-grained and the protocols are lightweight.

See [Server-side Micro-Fullstack](https://github.com/Shyam-Chen/Micro-Fullstack/tree/master/server) for instructions on how to create microservices from source code.
