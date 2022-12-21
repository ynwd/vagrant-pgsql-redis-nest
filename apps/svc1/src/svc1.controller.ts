import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Svc1Service } from './svc1.service';

@Controller()
export class Svc1Controller {
  constructor(private readonly svc1Service: Svc1Service) {}

  @MessagePattern({ cmd: 'svc1' })
  async getSvc1(name: string): Promise<string> {
    return this.svc1Service.getHello(name);
  }
}
