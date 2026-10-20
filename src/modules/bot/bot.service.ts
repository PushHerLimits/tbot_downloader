import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Bot, type Context } from 'node-telegram-bot-api';

@Injectable()
export class BotService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BotService.name);
  private bot?: Bot;
  private polling?: Promise<void>;

  // The client is created once the module is initialized (not at import time),
  // so the app can boot, and be tested, without a token.
  onModuleInit() {
    const token = process.env.TELEGRAM_API_TOKEN;
    if (!token) {
      this.logger.warn('TELEGRAM_API_TOKEN is not set; the bot is disabled.');
      return;
    }
    this.bot = new Bot(token);
    this.bot.on('message', (ctx) => this.onReceivedMessage(ctx));
    this.bot.catch((err) => this.logger.error('update handler failed', err as Error));
    this.polling = this.bot.startPolling().catch((err: unknown) => {
      this.logger.error('polling stopped', err as Error);
    });
  }

  async onModuleDestroy() {
    this.bot?.stop();
    await this.polling;
  }

  get isRunning(): boolean {
    return this.bot?.isRunning() ?? false;
  }

  // Log identifiers only: message bodies are user data.
  private onReceivedMessage(ctx: Context) {
    this.logger.log(`message ${ctx.message?.message_id} from chat ${ctx.chatId}`);
  }
}
