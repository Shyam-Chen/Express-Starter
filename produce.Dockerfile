FROM node:14

ENV HOME /Express-Starter

WORKDIR ${HOME}
ADD . $HOME

RUN npm install
RUN yarn build

ENV NODE_ENV production

# envs --
ENV HOST 0.0.0.0

ARG index_name
ENV INDEX_NAME=$index_name

ARG secret_key
ENV SECRET_KEY=$secret_key

ARG mongodb_uri
ENV MONGODB_URI=$mongodb_uri

ARG sentry_dsn
ENV SENTRY_DSN=$sentry_dsn

ENV RATE_LIMIT 100
# -- envs

# processes --
ENV WEB_CONCURRENCY 1
# -- processes

CMD node processes.js

# FROM caddy:2-alpine

# COPY Caddyfile /etc/caddy/Caddyfile
