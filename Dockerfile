FROM node:14.17-alpine as builder
RUN mkdir /srv/alpakaaleen
WORKDIR /srv/alpakaaleen
COPY ./package.json .
RUN npm install
COPY . .
FROM node:14.17-alpine
RUN mkdir /srv/alpakaaleen
WORKDIR /srv/alpakaaleen
COPY --from=builder /srv/alpakaaleen .
ENTRYPOINT ["node", "/srv/alpakaaleen/index.js"]
