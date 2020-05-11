FROM node:12.16.2-alpine3.11
WORKDIR /app
COPY ./client .
RUN npm ci
RUN npm test
