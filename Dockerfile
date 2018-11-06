FROM node:10

ENV HOME /Backend-Starter-Kit

WORKDIR ${HOME}
ADD . $HOME

RUN yarn install && yarn typed

EXPOSE 3000
