import { Controller, Get } from '@nestjs/common';
import { Svc2Service } from './svc2.service';

@Controller()
export class Svc2Controller {
  constructor(private readonly svc2Service: Svc2Service) {}

  @Get()
  getHello(): string {
    return this.svc2Service.getHello();
  }
}
