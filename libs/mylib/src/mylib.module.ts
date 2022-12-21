import { Module } from '@nestjs/common';
import { MylibService } from './mylib.service';

@Module({
  providers: [MylibService],
  exports: [MylibService],
})
export class MylibModule {}
