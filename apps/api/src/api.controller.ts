import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/')
  async getHello() {
    return this.apiService.getHello();
  }

  @Get('/svc1')
  async getSvc1() {
    return this.apiService.getSvc1();
  }

  @Get('/svc2')
  async getScv2() {
    return this.apiService.getSvc2({ message: 'getSvc2', status: true });
  }

  @Get('/svc2/user')
  async getScv2User() {
    return this.apiService.getUser();
  }
}
