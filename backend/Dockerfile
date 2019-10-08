FROM node:12-alpine

WORKDIR /app

COPY package.json .


RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000
CMD ["npm", "run", "start:prod" ]
