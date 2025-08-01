FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g npm@latest

COPY package*.json ./
COPY tsconfig*.json ./
COPY postcss.config.mjs ./
COPY next.config.ts ./
COPY public ./public
COPY components.json ./
COPY .env.production.local ./

RUN npm ci

COPY src ./src
COPY public ./public

RUN npm run build

FROM node:22-alpine AS release

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]
