# A Collection of Boardgames

Based on a Feathers Backend and a React frontend.

![halma board game preview](./frontend/public/logo192.png)

## Games

* Halma
* Mühle

Work in progress

* Pachisi
* Dame

## Development

```
cd frontend
yarn install
yarn start
```

```
cd backend
yarn install
yarn dev
```

## Docker

```
docker build -t halma .
docker container run -p 9001:3030 -d halma
```
