import { Test, TestingModule } from '@nestjs/testing';
import { UserAppController } from './user-app.controller';
import { UserAppService } from './user-app.service';

describe('UserAppController', () => {
  let controller: UserAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAppController],
      providers: [UserAppService],
    }).compile();

    controller = module.get<UserAppController>(UserAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
