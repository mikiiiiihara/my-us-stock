# syntax=docker/dockerfile:1
FROM node:16 AS builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prefer-offline --frozen-lockfile

COPY prisma ./prisma
RUN yarn prisma generate

COPY . .
RUN yarn build

FROM node:16-bullseye-slim AS runner
ENV NODE_ENV=production

# マイグレーションで必要
RUN apt-get -qy update && \
    apt-get -qy install openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma
RUN yarn install --production --prefer-offline --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY prisma ./prisma
CMD ["yarn", "start:prod"]
