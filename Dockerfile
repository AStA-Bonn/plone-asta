FROM node:16 as builder
WORKDIR /app
COPY ./package.json /app
COPY ./package-lock.json /app
RUN yarn
COPY ./ /app
RUN yarn build

FROM node:16
WORKDIR /app
COPY --from=0 ./build /app
CMD ["yarn start:prod"]

