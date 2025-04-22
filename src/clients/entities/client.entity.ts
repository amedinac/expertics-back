import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  // @Column('text')
  // lastname: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  phone: string;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];
}
