FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

# Don't install dev dependencies
RUN npm install --omit=dev

COPY . .

FROM alpine:latest as final

RUN apk --no-cache add nodejs ca-certificates

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./

CMD [ "node", "index.js" ]
