import { Injectable } from '@nestjs/common';

@Injectable()
export class Svc2Service {
  getHello(): string {
    return 'Hello World!';
  }
}
