FROM node:14

ENV HOME /Express-Starter

WORKDIR ${HOME}
ADD . $HOME

RUN npm install
RUN yarn build

ENV NODE_ENV production

# envs --
ENV HOST 0.0.0.0

ARG secret_key
ENV SECRET_KEY=$secret_key

ARG mongodb_uri
ARG postgres_url
ARG redis_url
ENV MONGODB_URI=$mongodb_uri
ENV POSTGRES_URL=$postgres_url
ENV REDIS_URL=$redis_url

ARG sentry_dsn
ENV SENTRY_DSN=$sentry_dsn

ENV RATE_LIMIT 100
# -- envs

# processes --
ENV WEB_CONCURRENCY 1
# -- processes

CMD node processes.js
