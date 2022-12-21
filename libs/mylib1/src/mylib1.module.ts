import { Module } from '@nestjs/common';
import { Mylib1Service } from './mylib1.service';

@Module({
  providers: [Mylib1Service],
  exports: [Mylib1Service],
})
export class Mylib1Module {}
