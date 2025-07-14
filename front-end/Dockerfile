FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g npm@latest

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY src ./src
COPY public ./public

RUN npm run build

FROM builder AS release

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.next ./.next

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
