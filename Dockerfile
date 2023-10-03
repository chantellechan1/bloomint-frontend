# syntax=docker/dockerfile:1

FROM node:20-alpine AS build

WORKDIR /bloomint-frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /bloomint-frontend
RUN npm install -g serve
COPY --from=build /bloomint-frontend/build /bloomint-frontend/build
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000", "--ssl-cert", "/letsencrypt/domain.cert.pem", "--ssl-key", "/letsencrypt/private.key.pem"]
