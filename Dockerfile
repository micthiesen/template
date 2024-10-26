FROM node:20.16.0-slim

RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack prepare pnpm@latest --activate && pnpm install

COPY . .
RUN pnpm run build

CMD ["node", "dist/index.js"]
