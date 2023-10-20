FROM node:20-slim AS base

# Create app directory
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY . .

FROM base as build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./app/dist

EXPOSE 3000
CMD [ "node", "app/dist/main" ]
