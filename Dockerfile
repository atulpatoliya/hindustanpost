# Install ALL dependencies (including devDependencies)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

ARG NEXT_PUBLIC_BASE_URL
ARG NEWS_BACKEND_BASE_URL
ARG SIGNED_URL_SECRET

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEWS_BACKEND_BASE_URL=$NEWS_BACKEND_BASE_URL
ENV SIGNED_URL_SECRET=$SIGNED_URL_SECRET

RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
