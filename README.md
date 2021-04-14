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
- [x] Web application framework with [**Express**](http://expressjs.com/).
- [x] Object-document mapping with [**Mongoose**](http://mongoosejs.com/).
- [x] Make authenticated requests with [**Passport**](http://passportjs.org/).
- [x] File upload with [**Multer**](https://github.com/expressjs/multer).
- [x] Real-time communication with [**WS**](https://github.com/websockets/ws).
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
- [x] Cloud storage‎ hosting with [**Cloudinary**](https://cloudinary.com/).
- [x] Error tracking service with [**Sentry**](https://sentry.io/).
- [x] Software container with [**Docker**](https://github.com/docker/docker).
- [x] Continuous integration with [**CircleCI**](https://circleci.com/).
- [x] Fix and prevent known vulnerabilities with [**Snyk**](https://snyk.io/).
- [x] Test coverage integration with [**Codecov**](https://codecov.io/).

## Table of Contents

- [Project Setup](#project-setup)
- [Dockerization](#dockerization)
- [Configuration](#configuration)
- [Examples](#examples)
- [Directory Structure](#directory-structure)
- [Microservices](#microservices)

## Project Setup

Follow steps to execute this boilerplate.

### Install dependencies

```sh
$ npm install
```

### Start a development server

```sh
$ brew services start mongodb-community
$ yarn serve
```

### Produce a production-ready bundle

```sh
$ yarn build
```

### Lints and fixes files

```sh
$ yarn lint
```

### Runs unit tests

Files: `src/**/*.spec.js`

```sh
$ yarn unit
```

### Runs end-to-end tests

Files: `e2e/**/*.spec.js`

```sh
$ yarn e2e
```

### Measures APIs

Files: `e2e/**/*.meas.js`

```sh
# Before running the `meas` command, make sure to run the following commands.
$ yarn build
$ yarn preview

# If it's not setup, run it.
$ yarn setup

$ yarn meas
```

### Mocks Third-party APIs

```sh
# If it's not active, run it.
$ yarn active

$ yarn mock
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
$ docker-compose up -d mongodb
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

export const SECRET_KEY = process.env.SECRET_KEY || 'jbmpHPLoaV8N0nEpuLxlpT95FYakMPiu';

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';
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
SENTRY_DSN
```

### File-based environments

If you want to set environment variables from a file.

```ts
.
├── envs
│   ├── dev.js
│   ├── stage.js
│   └── prod.js
└── src
```

```js
// envs/<ENV_NAME>.js

function Environment() {
  this.NODE_ENV = 'production';
}

module.exports = new Environment();
```

```sh
$ npm install babel-plugin-transform-inline-environment-variables env-cmd -D
```

```js
// babel.config.js

    plugins: [
      // ...
      'transform-inline-environment-variables',
    ],
```

```js
// package.json

  "scripts": {
    // "env-cmd -f ./envs/<ENV_NAME>.js" + "yarn build"
    "build:dev": "env-cmd -f ./envs/dev.js yarn build",
    "build:stage": "env-cmd -f ./envs/stage.js yarn build",
    "build:prod": "env-cmd -f ./envs/prod.js yarn build",
  },
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
│   │   │   ├── service.spec.js
│   │   │   ├── model.spec.js
│   │   │   └── rest|<FLOW>.e2e-spec.js
│   │   ├── controller.js
│   │   ├── service.js
│   │   ├── model.js
│   │   └── index.js
│   ├── <GROUP> -> module group
│   │   └── <FEATURE> -> feature modules
│   │       ├── __tests__
│   │       │   ├── controller.spec.js
│   │       │   ├── service.spec.js
│   │       │   ├── model.spec.js
│   │       │   └── rest|<FLOW>.e2e-spec.js
│   │       ├── controller.js
│   │       ├── service.js
│   │       ├── model.js
│   │       └── index.js
│   ├── app.js
│   ├── env.js
│   └── server.js
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

See [Server-side Micro-Fullstack](https://github.com/Shyam-Chen/Micro-Fullstack/tree/master/mbe) for instructions on how to create microservices from source code.
