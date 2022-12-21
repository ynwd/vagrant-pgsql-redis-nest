import { Test, TestingModule } from '@nestjs/testing';
import { MylibService } from './mylib.service';

describe('MylibService', () => {
  let service: MylibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MylibService],
    }).compile();

    service = module.get<MylibService>(MylibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
