FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

FROM base AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm add turbo -g
COPY . .

RUN turbo prune @iac/storybook --docker
RUN turbo telemetry disable

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN pnpm install

COPY --from=builder /app/out/full/ .
ENV TURBO_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN pnpm build --filter=@iac/storybook...

FROM nginx:alpine AS runtime
COPY --from=installer /app/apps/storybook/storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
