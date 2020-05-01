FROM node:12.16.2
#FROM node:12.16.2-alpine3.11

#RUN apk --no-cache add shadow \
#    gcc \
#    musl-dev \
#    autoconf \
#    automake \
#    make \
#    libtool \
#    nasm \
#    tiff \
#    jpeg \
#    zlib \
#    zlib-dev \
#    file \
#    pkgconf \
#    git \
#    less \
#    openssh

#RUN apk --update add git less openssh && \
#    rm -rf /var/lib/apt/lists/* && \
#    rm /var/cache/apk/*

#RUN npm i -g firebase-tools
#ADD firebase.bash /usr/bin
#RUN chmod +x /usr/bin/firebase.bash

WORKDIR /app
# RUN mkdir client
# WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
# RUN npm install
# RUN ls -af
#RUN npm run build
#RUN npm run deploy

# WORKDIR /app/client

# THIS WORKS
#
#WORKDIR /app
#COPY . .
#RUN ls -af
