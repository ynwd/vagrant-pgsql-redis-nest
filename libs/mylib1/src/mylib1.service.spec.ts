import { Test, TestingModule } from '@nestjs/testing';
import { Mylib1Service } from './mylib1.service';

describe('Mylib1Service', () => {
  let service: Mylib1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mylib1Service],
    }).compile();

    service = module.get<Mylib1Service>(Mylib1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
