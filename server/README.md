# Defi

## Start a redis server on PORT 6379

## `.env` file

```
NODE_ENV=production
APP_NAME=defi
PORT=4001
LOG_LEVEL=info

APP_SECURE_COOKIES=0
APP_SESSION_KEY=0943kd309kdklwdmeimwsd8948dknbjns
APP_SESSION_COOKIE_NAME=sessionId
APP_URL=http://defi-api-local.wax.test:4001
CLIENT_URL=http://defi-local.wax.test:4000
ALL_ACCESS_LOGIN_HOST_INTERNAL=https://stg-api-login.thh.io
ALL_ACCESS_LOGIN_HOST_EXTERNAL=https://stg-api-login.thh.io
ALL_ACCESS_BEARER_TOKEN=b220fd8547fed3d151f8632589c8f201
WAX_ON_HOST_INTERNAL=https://stg-wax-on.thh.io
```

## Update /etc/hosts file
add this line to `/etc/hosts` file
```
127.0.0.1 defi-api-local.wax.test
127.0.0.1 defi-local.wax.test
```

## Run

```
yarn install
yarn start
```
