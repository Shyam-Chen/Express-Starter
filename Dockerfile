FROM node:10

ENV HOME /Express-Play

WORKDIR ${HOME}
ADD . $HOME

RUN yarn install

EXPOSE 3000
