FROM node:12.16.2-alpine3.11

RUN apt-get -qq update && \
  apt-get -qq dist-upgrade && \
  apt-get -qq install pdftk && \
  apt-get -qq clean

COPY ./server ./

CMD [ "node", "dist/server.js" ]
