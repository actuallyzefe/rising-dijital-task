import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ListProductsDto } from 'src/product/dto/list-product.dto';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Req() req: Request,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.create(req.user.id, createOrderDto);
  }

  @Get()
  async listOrders(
    @Req() req: Request,
    @Query() listOrdersDto: ListProductsDto,
  ) {
    return this.orderService.listOrders(req.user.id, listOrdersDto);
  }
}
