# Defi

## [FrontEnd](server/README.md)
(Default: Frontend will run on PORT : 4000)

## [BackEnd](server/README.md)
(Default: Backend will run on PORT : 4001)

## How To Run Docker
1. create `.env` file
```
PORT=4001
LOG_LEVEL=info

NODE_ENV="production"
#Client port
CLIENT_PORT=4000

# Server port
SERVER_PORT=4001

# Local docker netowrk
D_SERVICES_NETWORK=wax-microservices
```

2. create `wax-microservices` network
```
docker network create wax-microservices
```

3. start docker
```
docker-compose up -d
```

### Local development

- Create `.env` if it does not exist. You can find the sample content in here [How To Run Docker](##how-to-run-docker)
- Create `.env` in both `client` and `server` folder. You can find the sample content in here [.env.example](./.env.example)

**Start docker compose**

```sh
docker network create wax-microservices
docker-compose -f docker-compose.yml -f docker-compose-local.yml build
docker-compose -f docker-compose.yml -f docker-compose-local.yml up -d
```

**Testing**

- Front-end: http://localhost:4000
- Back-end: http://locahost:4001/defi/apr
