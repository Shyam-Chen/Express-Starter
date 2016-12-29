FROM node:argon

RUN mkdir -p /Backend-Starter-Kit
WORKDIR /Backend-Starter-Kit

COPY package.json /Backend-Starter-Kit/
RUN npm install

COPY . /Backend-Starter-Kit

EXPOSE 8000
CMD [ "npm", "start" ]
