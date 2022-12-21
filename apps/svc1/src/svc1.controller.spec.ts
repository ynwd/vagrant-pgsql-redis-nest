import { Test, TestingModule } from '@nestjs/testing';
import { Svc1Controller } from './svc1.controller';
import { Svc1Service } from './svc1.service';

describe('Svc1Controller', () => {
  let svc1Controller: Svc1Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Svc1Controller],
      providers: [Svc1Service],
    }).compile();

    svc1Controller = app.get<Svc1Controller>(Svc1Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(svc1Controller.getHello()).toBe('Hello World!');
    });
  });
});
