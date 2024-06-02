import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(registerDto: RegisterDto) {
    return this.userRepository.save(registerDto);
  }

  async findOne(options: Partial<User>) {
    const user = await this.userRepository.findOne({
      where: options,
      relations: ['orders', 'orders.products'],
    });

    delete user.password;

    return user;
  }

  async updateFields(id: number, fieldsToUpdate: Partial<User>) {
    return this.userRepository.update(id, fieldsToUpdate);
  }

  async deposit(id: number, amount: number) {
    const user = await this.findOne({ id });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const updatedBalance = user.balance + amount;

    const updateResult = await this.updateFields(id, {
      balance: updatedBalance,
    });

    return updateResult;
  }
}
