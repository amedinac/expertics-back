import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Quote } from 'src/quote/entities/quote.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  serial: string;

  @Column('text')
  description: string;

  @Column('text')
  coverage: string;

  @Column('text')
  vmi: string;

  @Column('text')
  fail: string;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToOne(() => Quote)
  @JoinColumn({ name: 'quote_id' })
  quote: Quote;
}
