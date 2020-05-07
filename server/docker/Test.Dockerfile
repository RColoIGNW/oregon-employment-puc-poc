FROM node:12.16.2
RUN apt-get -qq update && \
  apt-get -qq dist-upgrade && \
  apt-get -qq install pdftk && \
  apt-get -qq clean
WORKDIR /app
COPY . .
RUN npm i && \
  npm test:server
