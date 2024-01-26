FROM mehmetumit1/address-book-frontend:latest as builder
FROM nginx:mainline-alpine

COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/address-book-frontend/browser/ /etc/nginx/html/
