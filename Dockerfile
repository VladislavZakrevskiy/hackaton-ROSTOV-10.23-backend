FROM node:20-slim AS base
RUN apt-get update -y && apt-get install -y openssl
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

COPY . .

FROM base as build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/prisma /app/prisma

EXPOSE 3000
CMD [ "pnpm", "run", "start:migrate:prod" ]
