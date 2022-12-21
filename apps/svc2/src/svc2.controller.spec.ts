import { Test, TestingModule } from '@nestjs/testing';
import { Svc2Controller } from './svc2.controller';
import { Svc2Service } from './svc2.service';

describe('Svc2Controller', () => {
  let svc2Controller: Svc2Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Svc2Controller],
      providers: [Svc2Service],
    }).compile();

    svc2Controller = app.get<Svc2Controller>(Svc2Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(svc2Controller.getHello()).toBe('Hello World!');
    });
  });
});
