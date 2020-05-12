FROM node:12

ENV HOME /Express-Starter

WORKDIR ${HOME}
ADD . $HOME

RUN yarn install --frozen-lockfile

EXPOSE 3000
