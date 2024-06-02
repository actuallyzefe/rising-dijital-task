import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { DepositDto } from './dto/deposit.dto';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me(@Req() req: Request) {
    return this.userService.findOne({ id: req.user.id });
  }

  @Post('deposit')
  async deposit(@Req() req: Request, @Body() depositDto: DepositDto) {
    return this.userService.deposit(req.user.id, depositDto.amount);
  }
}
