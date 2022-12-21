import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const config = app.get<ConfigService>(ConfigService);

  await app.listen(config.get<string>('APP_PORT') || 3000, async () => {
    const appName = config.get<string>('APP_NAME');
    const logger = new Logger(appName);
    logger.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
