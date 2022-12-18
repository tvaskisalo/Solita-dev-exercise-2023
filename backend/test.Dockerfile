FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

CMD npm run test; npm run start:test
