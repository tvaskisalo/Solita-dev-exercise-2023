FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV PORT=PORT:3001
ENV MONGODB_TEST_URI=MONGODB_TEST_URI
ENV MONGODB_URI=MONGODB_URI

CMD npm run test; npm start
