import { NestFactory } from '@nestjs/core';
import { Svc2Module } from './svc2.module';

async function bootstrap() {
  const app = await NestFactory.create(Svc2Module);
  await app.listen(3000);
}
bootstrap();
