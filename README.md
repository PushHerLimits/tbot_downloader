# tbot_downloader

A Telegram bot that downloads videos from links shared in a chat, built on **NestJS 11** and TypeScript.

> **Status: early stage.** The bot connects to Telegram (long polling) and receives and logs incoming
> messages. The download pipeline is the next milestone.

## Architecture

- `BotModule` / `BotService` — wraps `node-telegram-bot-api`; handlers are registered in the
  `OnModuleInit` lifecycle hook once dependency injection is ready.
- `AppModule` composes modules from two import lists (`src/app/imports/internals.import.ts` and
  `externals.import.ts`) so infrastructure and feature modules stay separate.
- `docker-compose.yml` runs the app next to MongoDB 6 and Redis 7 (planned: persistence and a job
  queue for downloads).

## Getting started

```bash
npm ci
cp .env.example .env   # then fill in the values below
npm run start:dev
```

| Variable | Purpose |
| :-- | :-- |
| `TELEGRAM_API_TOKEN` | Bot token from [@BotFather](https://t.me/BotFather) |
| `PORT` / `APP_PORT` | HTTP port inside / outside the container |
| `MONGO_*`, `REDIS_HOSTNAME` | Database settings used by `docker-compose.yml` |

Never commit `.env`; it is git-ignored.

## Scripts

| Command | What it does |
| :-- | :-- |
| `npm run start:dev` | Watch mode |
| `npm run build` | Compile to `dist/` |
| `npm run lint` | ESLint + Prettier |
| `npm test` | Jest unit tests |

## Roadmap

- [ ] Download pipeline (validate link → fetch → send file back)
- [ ] Queue long downloads in Redis
- [ ] Persist chats and requests
- [ ] Tests for the message handler
