FROM node:10-alpine

WORKDIR /app
COPY . ./

RUN npm i

EXPOSE 5000

CMD [ "node", "dist/server.js" ]
