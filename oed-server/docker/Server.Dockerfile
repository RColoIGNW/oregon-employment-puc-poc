#FROM node:12.16.2-alpine3.11 as build-image
#
#COPY oed-server/ .
#RUN npm install
#RUN tsc
#RUN npm prune --production

FROM node:12.16.2-alpine3.11

WORKDIR /app

COPY dist/ ./
COPY node_modules/ ./
COPY package.json .package.json
COPY .env .env
COPY sa.json sa.json

CMD [ "node", "dist/server.js" ]
