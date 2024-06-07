FROM node:16-alpine

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm run build

RUN apk add --no-cache sqlite

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
