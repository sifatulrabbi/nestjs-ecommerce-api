import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from '../dto/users.dto';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller.userSignUp).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller.userLogin).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller.userSignUp).toBeCalledWith(UserDto);
  });
});
