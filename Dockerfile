FROM node:12

ENV HOME /Express-Starter

WORKDIR ${HOME}
ADD . $HOME

RUN yarn install

EXPOSE 3000
