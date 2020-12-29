FROM node:14

WORKDIR /usr/src
VOLUME [ "/usr/src" ]

RUN npm install

EXPOSE 3000

CMD [ "yarn", "serve" ]
