# ---- Dependências (somente produção) ----
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- Build ----
FROM node:18-alpine AS builder
WORKDIR /app
# URL da API consumida pelo navegador (client-side). Pode ser sobrescrita em build:
#   docker compose build --build-arg NEXT_PUBLIC_API_URL=http://meu-host:8000
ARG NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Next.js 11 usa webpack com hashing MD4, incompatível com o OpenSSL 3 do
# Node >= 17. O script "build" já habilita --openssl-legacy-provider.
RUN npm run build

# ---- Runtime ----
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
