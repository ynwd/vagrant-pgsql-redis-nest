import { Svc2Service } from './svc2.service';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class Svc2Controller {
  constructor(private readonly svc2Service: Svc2Service) {}

  @MessagePattern({ cmd: 'svc2' })
  async getSvc1(data: any): Promise<string> {
    return this.svc2Service.getHello(data);
  }
}
