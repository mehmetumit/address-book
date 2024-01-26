FROM node:alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# Copy in web server image
# COPY --from=builder /app/dist/address-book-fronted/browser /usr/share/nginx/html
