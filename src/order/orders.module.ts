import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UserModule, ProductModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
