process.env.JWT_SECRET = 'very-secret-key';

import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService;
  let userService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  describe('register', () => {
    it('throws an error if user already exists', async () => {
      userService.findOne.mockResolvedValue(true);
      await expect(
        authService.register({
          password: 'test',
          email: 'test@test.com',
          first_name: 'first',
          last_name: 'last',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('returns a token if successful', async () => {
      userService.findOne.mockResolvedValue(false);
      userService.create.mockResolvedValue({ id: 1, email: 'test@test.com' });
      const result = await authService.register({
        password: 'test',
        email: 'test@test.com',
      });
      expect(result).toHaveProperty('token');
    });
  });

  describe('login', () => {
    it('throws an error if user not found', async () => {
      userService.findOne.mockResolvedValue(false);
      await expect(
        authService.login({ password: 'test', email: 'test@test.com' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws an error if password is incorrect', async () => {
      userService.findOne.mockResolvedValue({ password: 'wrong' });
      await expect(
        authService.login({ password: 'test', email: 'test@test.com' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('returns a token if successful', async () => {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash('test', saltRounds);

      userService.findOne.mockResolvedValue({
        password: hashedPassword,
        email: 'test@test.com',
      });

      const result = await authService.login({
        password: 'test',
        email: 'test@test.com',
      });

      expect(result).toHaveProperty('token');
    });
  });
});
