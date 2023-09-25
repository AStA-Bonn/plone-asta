FROM node:16 as builder
WORKDIR /app
COPY ./package.json /app
COPY ./yarn.lock /app
COPY ./ /app
RUN yarn
RUN yarn build
CMD ["yarn start:prod"]

#FROM node:16
#WORKDIR /app
#COPY --from=0 /app/build /app

