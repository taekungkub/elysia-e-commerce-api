FROM oven/bun AS build

WORKDIR /app

# Cache packages installation
COPY package.json package.json
COPY bun.lock bun.lock

RUN bun i

COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]