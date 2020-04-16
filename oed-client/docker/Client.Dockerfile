FROM node:12.16.2
# FROM node:12.16.2-alpine3.11

#RUN apk --update add git less openssh && \
#    rm -rf /var/lib/apt/lists/* && \
#    rm /var/cache/apk/*

#RUN npm i -g firebase-tools
#ADD firebase.bash /usr/bin
#RUN chmod +x /usr/bin/firebase.bash

WORKDIR /app
# RUN mkdir oed-client
# WORKDIR /app/oed-client
RUN echo ">>>>>>> Coping package info to container <<<<<<<"
COPY oed-client/package*.json ./
RUN echo ">>>>>>> Running NPM Install <<<<<<<"
RUN npm install
RUN echo ">>>>>>> Copying Client contents to folder <<<<<<<"
COPY oed-client/ .
RUN echo ">>>>>>> Building Gatsby static files <<<<<<<"
RUN npm run build
RUN echo ">>>>>>> Deploying build to Firebase Hosting <<<<<<<"
RUN npn run deploy
