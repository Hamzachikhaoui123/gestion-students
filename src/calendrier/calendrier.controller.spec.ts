import { Test, TestingModule } from '@nestjs/testing';
import { CalendrierController } from './calendrier.controller';
import { CalendrierService } from './calendrier.service';

describe('CalendrierController', () => {
  let controller: CalendrierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendrierController],
      providers: [CalendrierService],
    }).compile();

    controller = module.get<CalendrierController>(CalendrierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
