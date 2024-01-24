FROM app/address-book-frontend as builder
FROM nginx:mainline-alpine

COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/address-book-frontend/browser/ /etc/nginx/html/
