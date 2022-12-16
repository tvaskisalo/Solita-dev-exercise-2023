FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV PORT=PORT:3001
ENV MONGODB_URI=MONGODB_URI

CMD npm start
