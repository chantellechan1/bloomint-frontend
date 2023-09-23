# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /bloomint-frontend
COPY . /bloomint-frontend
COPY package*.json .
RUN npm install -f
COPY src/ public/ /bloomint-frontend
RUN npm run build

FROM node:20-alpine
WORKDIR /bloomint-frontend
COPY --from=build /bloomint-frontend/build /bloomint-frontend/build
RUN npm install -g serve
EXPOSE 300

CMD ["serve", "-s", "build", "-l", "3000"]
