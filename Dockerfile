FROM node:lts as buildfrontend

WORKDIR /home/node/frontend
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install
COPY frontend ./
RUN yarn build

FROM node:lts-alpine

WORKDIR /usr/src/app/backend

COPY backend/package.json backend/yarn.lock ./

RUN yarn install

WORKDIR /usr/src/app

COPY --from=buildfrontend /home/node/frontend/build frontend/build

WORKDIR /usr/src/app/backend

COPY backend ./

EXPOSE 3030

CMD ["yarn", "run", "start"]
