FROM node:14

ENV HOME /Express-Starter

WORKDIR ${HOME}
ADD . $HOME

RUN npm install

EXPOSE 3000
