import { Test, TestingModule } from '@nestjs/testing';
import { AfricasTalkingService } from './africas-talking.service';

describe('AfricasTalkingService', () => {
  let service: AfricasTalkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AfricasTalkingService],
    }).compile();

    service = module.get<AfricasTalkingService>(AfricasTalkingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
