FROM node:16.14

RUN mkdir -p /app/server

WORKDIR /app/server

COPY package*.json /app/server

RUN npm install -g nodemon

RUN npm install -g ts-node

RUN npm install -g typescript

RUN npm install --save-dev @types/node

RUN npm install && npm cache clean --force

CMD ["npm", "start"]