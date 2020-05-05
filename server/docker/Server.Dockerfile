FROM node:12.16.2

RUN apt-get -qq update && \
  apt-get -qq dist-upgrade && \
  apt-get -qq install pdftk && \
  apt-get -qq clean

COPY ./server/dist ./dist
COPY ../src/templates ./dist/templates
COPY ./server/node_modules ./node_modules
COPY ./server/package.json .package.json
COPY ./server/.env .env
COPY ./server/sa.json sa.json

CMD [ "node", "dist/server.js" ]
