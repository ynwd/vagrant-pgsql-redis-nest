import { Injectable } from '@nestjs/common';

@Injectable()
export class Svc1Service {
  getHello(name: string): string {
    return `Hello ${name}`;
  }
}
