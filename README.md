# Auction system
## [About the system specs](ABOUT.md)

## [FrontEnd](client/README.md)
(Default: Frontend will run on PORT : 4000)

## [BackEnd](server/README.md)
(Default: Backend will run on PORT : 4001)

## How To Run Docker
1. create `.env` file from `.env.example` file

2. create `auction-microservices` network
```
docker network create auction-microservices
```

3. start docker
```
docker-compose up -d
```
4. Check docker container
```
docker ps
```

**Start docker compose**

```sh
docker network create wax-microservices
docker-compose -f docker-compose.yml -f docker-compose-local.yml build
docker-compose -f docker-compose.yml -f docker-compose-local.yml up -d
```

## Checking app on browser

- Front-end: 

  http://localhost:4000

  http://localhost:4000/login

  http://localhost:4000/register

- Back-end:

  [Healthcheck endpoint] http://locahost:4001/healthcheck

  [Swagger document endpoint] http://locahost:4001/api-doc

  [Api endpoint] http://locahost:4001/api

## Unit Test
- Front-end
```
  [TBD]
```
- Back-end
```
  docker exec auction_api yarn test
```