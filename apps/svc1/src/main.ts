import { NestFactory } from '@nestjs/core';
import { Svc1Module } from './svc1.module';

async function bootstrap() {
  const app = await NestFactory.create(Svc1Module);
  await app.listen(3000);
}
bootstrap();
