# syntax=docker/dockerfile:1

FROM node:20-alpine AS build

WORKDIR /bloomint-frontend
COPY . .

RUN npm install -f
RUN npm run build

FROM node:20-alpine
WORKDIR /bloomint-frontend
COPY --from=build /bloomint-frontend/build /bloomint-frontend/build
RUN npm install -g serve
EXPOSE 300

CMD ["serve", "-s", "build", "-l", "3000", "--ssl-cert", "/letsencrypt/domain.cert.pem", "--ssl-key", "/letsencrypt/private.key.pem"]
