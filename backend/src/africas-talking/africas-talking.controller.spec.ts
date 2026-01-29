import { Test, TestingModule } from '@nestjs/testing';
import { AfricasTalkingController } from './africas-talking.controller';

describe('AfricasTalkingController', () => {
  let controller: AfricasTalkingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AfricasTalkingController],
    }).compile();

    controller = module.get<AfricasTalkingController>(AfricasTalkingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
