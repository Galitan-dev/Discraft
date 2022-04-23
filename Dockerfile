ARG NODE_IMAGE=node:16.13.1-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add yarn
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package.json ./
RUN yarn
COPY --chown=node:node . .

FROM dependencies AS build
RUN yarn build

FROM base AS production
ENV NODE_ENV production
COPY --chown=node:node ./package.json ./
RUN yarn --production
COPY --chown=node:node . .
CMD [ "yarn", "start" ]