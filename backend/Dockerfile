FROM node:alpine as builder

WORKDIR /app

COPY package*.json ./

# Don't install dev dependencies
RUN npm install --omit=dev

COPY doc/swagger.yaml ./doc/

COPY src /app/src

COPY scripts /app/scripts

FROM alpine:latest as final

# Really small image size with --no-cache option and
# by installing only necessary packages
RUN apk --no-cache add nodejs ca-certificates

WORKDIR /app

COPY --from=builder /app ./

CMD [ "node", "./src/index.js" ]
