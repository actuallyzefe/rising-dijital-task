
FROM node:18-alpine

WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .


RUN apk add --no-cache sqlite


EXPOSE 3000


CMD ["npm", "run", "start:prod"]
