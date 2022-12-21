import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ApiService {
  constructor(@Inject('GREETING_SERVICE') private client: ClientProxy) {}

  getHello() {
    return `Hello world!`;
  }

  getSvc1() {
    return this.client.send({ cmd: 'svc1' }, 'getSvc1');
  }

  getSvc2(data: any) {
    return this.client.send({ cmd: 'svc2' }, data);
  }

  getUser() {
    return this.client.send({ cmd: 'findAllUser' }, '');
  }
}
