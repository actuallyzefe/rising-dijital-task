import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { ListOrdersDto } from './dto/list-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const { product_id, quantity } = createOrderDto;

    const user = await this.userService.findOne({ id: userId });

    if (!user) throw new NotFoundException('User Not Found');

    const userBalance = user.balance;

    const product = await this.productService.findOne({
      id: product_id,
    });

    const { price } = product;

    const total_price = price * quantity;

    if (userBalance < total_price) {
      throw new BadRequestException('Insufficient balance');
    }

    await this.userService.updateFields(userId, {
      balance: userBalance - total_price,
    });

    user.balance = userBalance - total_price;

    delete user.password;

    product.stock -= quantity;

    const order = this.orderRepository.create({
      ...createOrderDto,
      total_price,
      quantity,
      created_by: user,
      products: [product],
    });

    await this.productService.decreaseStock(product_id, quantity);

    return this.orderRepository.save(order);
  }

  async listOrders(userId: number, listOrdersDto: ListOrdersDto) {
    const { page = 1, limit = 10 } = listOrdersDto;

    const [results, total] = await this.orderRepository.findAndCount({
      where: {
        created_by: { id: userId },
      },
      relations: ['products'],
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      results,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
