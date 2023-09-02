import { Test, TestingModule } from '@nestjs/testing';
import { UsesrService } from './usesr.service';

describe('UsesrService', () => {
  let service: UsesrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsesrService],
    }).compile();

    service = module.get<UsesrService>(UsesrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
