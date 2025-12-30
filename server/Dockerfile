FROM node:22-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk update && apk add bash

ENV APP_DIR /server
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY package*.json ./
COPY pnpm*.yaml ./  

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 8000

CMD ["pnpm", "start"]