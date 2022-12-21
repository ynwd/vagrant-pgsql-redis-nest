import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Svc1Controller } from './svc1.controller';
import { Svc1Service } from './svc1.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [Svc1Controller],
  providers: [Svc1Service],
})
export class Svc1Module {}
