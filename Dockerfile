FROM node:alpine

RUN mkdir -p /src

WORKDIR /src

COPY /package.json /src

RUN npm install

COPY . /src

EXPOSE 3004

CMD ["node", "server/index.js"]