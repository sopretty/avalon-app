FROM node:15.10.0-alpine as builder

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build --prod --build-optimizer


FROM nginx:1.13.9-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/avalon-app /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
