import { Test } from '@nestjs/testing';
import { BotService } from './bot.service';

describe('BotService', () => {
  const original = process.env.TELEGRAM_API_TOKEN;
  afterEach(() => {
    process.env.TELEGRAM_API_TOKEN = original;
  });

  it('stays disabled without a token instead of crashing the app', async () => {
    delete process.env.TELEGRAM_API_TOKEN;
    const moduleRef = await Test.createTestingModule({ providers: [BotService] }).compile();
    await moduleRef.init();
    expect(moduleRef.get(BotService).isRunning).toBe(false);
    await moduleRef.close();
  });
});
