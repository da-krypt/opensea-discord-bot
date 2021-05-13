FROM node:14

RUN mkdir -p /code
WORKDIR /code
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn dev
