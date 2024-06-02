import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(registerDto: RegisterDto) {
    const { password, email } = registerDto;

    const existingUser = await this.userService.findOne({
      email,
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });

    const token = await this.generateToken(user);
    return { token };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new NotFoundException('Invalid Credentials');
    }

    const isPasswordMatching = await this.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new BadRequestException('Invalid Credentials');
    }

    const token = await this.generateToken(user);

    return { token };
  }

  private readonly hashPassword = async (password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  private readonly comparePasswords = async (
    password: string,
    hashedPassword: string,
  ) => {
    return bcrypt.compare(password, hashedPassword);
  };

  private readonly generateToken = async (user: User) => {
    const payload = { email: user.email, id: user.id };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  };
}
