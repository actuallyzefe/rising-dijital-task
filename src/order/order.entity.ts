import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  created_by: User;

  @ManyToMany(() => Product, (product) => product.orders)
  products: Product[];

  @Column({ type: 'float' })
  quantity: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  total_price: number;
}
