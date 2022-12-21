import { Module } from '@nestjs/common';
import { Svc2Controller } from './svc2.controller';
import { Svc2Service } from './svc2.service';

@Module({
  imports: [],
  controllers: [Svc2Controller],
  providers: [Svc2Service],
})
export class Svc2Module {}
