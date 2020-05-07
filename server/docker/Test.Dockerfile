FROM node:12.16.2
RUN apt-get -qq update && \
  apt-get -qq dist-upgrade && \
  apt-get -qq install pdftk && \
  apt-get -qq clean

COPY ./server ./

RUN npm i && \
  npm run test
