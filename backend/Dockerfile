FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

# Don't install dev dependencies
RUN npm install --omit=dev

COPY . .

FROM alpine:latest as final

# Really small image size with --no-cache option and
# by installing only necessary packages
RUN apk --no-cache add nodejs ca-certificates

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./

CMD [ "node", "./src/index.js" ]
