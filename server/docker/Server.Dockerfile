FROM node:12.16.2

COPY ./server ./
COPY ./server/src/templates ./server/dist/templates

RUN ls-la
RUN ls-la dist

RUN apt-get -qq update && \
  apt-get -qq dist-upgrade && \
  apt-get -qq install pdftk && \
  apt-get -qq clean

CMD [ "node", "dist/server.js" ]
