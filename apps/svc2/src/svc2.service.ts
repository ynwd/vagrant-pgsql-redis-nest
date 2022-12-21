import { Injectable } from '@nestjs/common';

@Injectable()
export class Svc2Service {
  getHello(data: any): string {
    return data;
  }
}
