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
- [x] Object document mapping with [**Mongoose**](http://mongoosejs.com/).
- [x] Object relational mapping with [**Sequelize**](http://docs.sequelizejs.com/).
- [x] In-memory data structure store with [**Redis**](https://redis.io/).
- [x] Authenticate requests with [**Passport**](http://passportjs.org/).
- ---------- **Tools** ----------
- [x] Next generation JavaScript with [**Babel**](https://github.com/babel/babel).
- [x] OpenAPI specification with [**Swagger**](https://swagger.io/).
- [x] JavaScript static code analyzer with [**ESLint**](https://github.com/eslint/eslint).
- [x] Code formatter with [**Prettier**](https://prettier.io/).
- [x] JavaScript static type checker with [**Flow**](https://flow.org/).
- [x] Unit testing with [**Jest**](https://github.com/facebook/jest).
- [x] End-to-End testing with [**Supertest**](https://github.com/visionmedia/supertest).
- [x] Automatically restart application with [**Nodemon**](https://github.com/remy/nodemon).
- [x] Keeping application alive with [**PM2**](https://github.com/Unitech/pm2).
- ---------- **Environments** ----------
- [x] JavaScript runtime with [**Node.js**](https://nodejs.org/).
- [x] Fast and deterministic builds with [**Yarn**](https://github.com/yarnpkg/yarn).
- [x] Version control with [**Git**](https://github.com/git/git).
- [x] Code repository with [**GitHub**](https://github.com/).
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

3. Start a local server

```bash
$ yarn serve
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
CREATE USER tester WITH PASSWORD '12345678' CREATEDB;

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

export const HOST = process.env.HOST || '0.0.0.0';
export const PORT = process.env.PORT || 3000;

export const SECRET_KEY = process.env.SECRET_KEY || 'PUT_YOUR_SECRET_KEY_HERE';

export const MONGODB_URI = process.env.MONGODB_URI || '<PUT_YOUR_MONGODB_URI_HERE>';
export const POSTGRES_URL = process.env.POSTGRES_URL || 'PUT_YOUR_POSTGRES_URL_HERE';

export const REDIS_PORT = process.env.REDIS_PORT || '<PUT_YOUR_REDIS_PORT_HERE>';
export const REDIS_HOST = process.env.REDIS_HOST || '<PUT_YOUR_REDIS_HOST_HERE>';

// ...
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
│   ├── core -> core feature module
│   ├── <FEATURE> -> feature modules
│   │   ├── __tests__
│   │   │   ├── <FEATURE>.e2e-spec.js
│   │   │   └── <FEATURE>.spec.js
│   │   ├── _<THING> -> feature of private things
│   │   │   └── ...
│   │   └── <FEATURE>.js
│   ├── <GROUP> -> module group
│   │   └── <FEATURE> -> feature modules
│   │       ├── __tests__
│   │       │   ├── <FEATURE>.e2e-spec.js
│   │       │   └── <FEATURE>.spec.js
│   │       ├── _<THING> -> feature of private things
│   │       │   └── ...
│   │       └── <FEATURE>.js
│   ├── shared -> shared feature module
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
├── circle.yml
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── LICENSE
├── package.json
├── processes.js
├── README.md
└── yarn.lock
```

## Microservices

> Microservice architecture – a variant of the service-oriented architecture structural style – arranges an application as a collection of loosely coupled services. In a microservices architecture, services are fine-grained and the protocols are lightweight.

See [Server-side Micro-Fullstack](https://github.com/Shyam-Chen/Micro-Fullstack/tree/master/server) for instructions on how to create microservices from source code.
