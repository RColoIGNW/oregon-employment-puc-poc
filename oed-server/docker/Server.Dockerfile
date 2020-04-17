#FROM node:12.16.2-alpine3.11 as build-image
#
#COPY oed-server/ .
#RUN npm install
#RUN tsc
#RUN npm prune --production

FROM node:12.16.2-alpine3.11

RUN ls -af

COPY ./oed-server/dist ./dist
RUN ls -af
RUN ls -af ./dist
COPY ./oed-server/node_modules ./node_modules
RUN ls -af
COPY ./oed-server/package.json .package.json
COPY ./oed-server/.env .env
COPY ./oed-server/sa.json sa.json

CMD [ "node", "dist/server.js" ]
