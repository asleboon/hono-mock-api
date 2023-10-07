FROM oven/bun:latest as build-stage
# Debug docker build: docker build -t myapp . > /tmp/docker_build.log 2>&1
# docker buildx build --platform linux/amd64 -t asleboon/weather-api:latest . --push

WORKDIR /app

COPY . .

RUN bun install
# RUN bun install pm2 -g # TODO: only need pm2-runtime

RUN bun build ./src/index.tsx --outdir ./out

# TODO: Reduce image size
# FROM oven/bun:latest AS run-stage
# COPY --from=build-stage /app/.env ./.env
# COPY --from=build-stage /app/ .
# COPY --from=build-stage /app/out .

# Run container as non-root (unprivileged) user
RUN addgroup --system bun-app --gid 1001
RUN adduser --system nonroot --uid 1001
USER nonroot

EXPOSE 8080

CMD ["bun","run","./out/index.js"]
# CMD ["pm2-runtime", "bun ./out/index.js"]
