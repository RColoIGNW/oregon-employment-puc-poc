#FROM node:12.16.2-alpine3.11 as build-image
#
#COPY server/ .
#RUN npm install
#RUN tsc
#RUN npm prune --production

FROM node:12.16.2-alpine3.11

COPY ./server/dist ./dist
COPY ./server/node_modules ./node_modules
COPY ./server/package.json .package.json
COPY ./server/.env .env
COPY ./server/sa.json sa.json

CMD [ "node", "dist/server.js" ]
