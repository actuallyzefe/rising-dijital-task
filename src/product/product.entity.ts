import { Order } from '../order/order.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @ManyToMany(() => Order, (order) => order.products)
  @JoinTable()
  orders: Order[];
}
