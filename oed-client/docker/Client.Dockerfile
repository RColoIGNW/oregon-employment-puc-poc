FROM node:12.16.2
# FROM node:12.16.2-alpine3.11

#RUN apk --update add git less openssh && \
#    rm -rf /var/lib/apt/lists/* && \
#    rm /var/cache/apk/*

#RUN npm i -g firebase-tools
#ADD firebase.bash /usr/bin
#RUN chmod +x /usr/bin/firebase.bash

WORKDIR /app
RUN npm i -g firebase-tools
COPY oed-client/package*.json oed-client/.
WORKDIR /app/oed-client
RUN npm ci

COPY oed-client/. .
