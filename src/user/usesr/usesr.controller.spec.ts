import { Test, TestingModule } from '@nestjs/testing';
import { UsesrController } from './usesr.controller';

describe('UsesrController', () => {
  let controller: UsesrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsesrController],
    }).compile();

    controller = module.get<UsesrController>(UsesrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
