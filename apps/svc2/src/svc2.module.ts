import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Svc2Controller } from './svc2.controller';
import { Svc2Service } from './svc2.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule],
  controllers: [Svc2Controller],
  providers: [Svc2Service],
})
export class Svc2Module {}
