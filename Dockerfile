# syntax=docker/dockerfile:1

FROM node:20-alpine AS build

WORKDIR /bloomint-frontend
COPY package.json package-lock.json ./
RUN npm install -f
COPY . .
RUN npm run build

FROM node:20-alpine
RUN npm install -g serve
WORKDIR /bloomint-frontend
COPY --from=build /bloomint-frontend/build .
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000", "--ssl-cert", "/letsencrypt/domain.cert.pem", "--ssl-key", "/letsencrypt/private.key.pem"]
