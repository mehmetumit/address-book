FROM node:alpine as builder

WORKDIR /app

COPY package*.json ./

# Don't install dev dependencies
RUN npm install --omit=dev

COPY . .

RUN npm run build


# Copy in web server image
# COPY --from=builder /app/dist/address-book-fronted/browser /usr/share/nginx/html
