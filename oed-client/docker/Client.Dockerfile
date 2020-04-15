FROM node:12.16.2-alpine3.11

RUN apk --update add git less openssh && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*

WORKDIR /app
COPY oed-client /app
