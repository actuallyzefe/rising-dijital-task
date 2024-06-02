import { Order } from '../order/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0 })
  balance: number;

  @OneToMany(() => Order, (order) => order.created_by)
  orders: Order[];
}
