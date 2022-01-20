
FROM node:14

RUN npm install yarn

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN "yarn" "install"

COPY . .

RUN "yarn" "build"


EXPOSE 8080

CMD ["yarn","start"]