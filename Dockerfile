FROM oven/bun

WORKDIR /usr/src/app

COPY package*.json bun.lockb ./
COPY packages packages
RUN bun install
COPY . .

ENV NODE_ENV production
ENV HOSTNAME 0.0.0.0
ENV PORT 3000

CMD [ "bun", "start" ]
