import { Controller, Get } from '@nestjs/common';
import { Svc1Service } from './svc1.service';

@Controller()
export class Svc1Controller {
  constructor(private readonly svc1Service: Svc1Service) {}

  @Get()
  getHello(): string {
    return this.svc1Service.getHello();
  }
}
