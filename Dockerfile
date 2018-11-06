FROM node:10-jessie

ENV HOME /Backend-Starter-Kit

WORKDIR ${HOME}
ADD . $HOME

RUN yarn install && yarn typed

EXPOSE 3000
