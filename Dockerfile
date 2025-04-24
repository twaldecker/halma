FROM node:22 as buildfrontend
WORKDIR /home/node/frontend
RUN corepack enable
COPY frontend .
RUN yarn rebuild && yarn build

FROM node:22 as buildbackend
WORKDIR /home/node/backend
RUN corepack enable
COPY backend .
RUN yarn rebuild && yarn build

FROM node:22-alpine
WORKDIR /usr/src/app
RUN corepack enable
COPY backend backend
COPY --from=buildfrontend /home/node/frontend/build frontend/build

WORKDIR /usr/src/app/backend
RUN yarn rebuild && yarn build
EXPOSE 3030

CMD ["yarn", "run", "start"]
