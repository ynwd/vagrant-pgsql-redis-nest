import { Module } from '@nestjs/common';
import { Svc1Controller } from './svc1.controller';
import { Svc1Service } from './svc1.service';

@Module({
  imports: [],
  controllers: [Svc1Controller],
  providers: [Svc1Service],
})
export class Svc1Module {}
