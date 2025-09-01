FROM docker.io/node:24 as buildfrontend
WORKDIR /home/node/frontend
RUN corepack enable
COPY frontend .
RUN yarn rebuild && yarn build

FROM docker.io/node:24 as buildbackend
WORKDIR /home/node/backend
RUN corepack enable
COPY backend .
RUN yarn rebuild && yarn build

FROM docker.io/node:24-alpine
WORKDIR /usr/src/app
RUN corepack enable
COPY backend backend
COPY --from=buildfrontend /home/node/frontend/build frontend/build

WORKDIR /usr/src/app/backend
RUN yarn rebuild && yarn build
EXPOSE 3030

ENTRYPOINT ["yarn", "run", "start"]
