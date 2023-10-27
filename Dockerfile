FROM node:16

WORKDIR /express/
COPY . /express/

RUN yarn install
RUN yarn build
CMD yarn start
