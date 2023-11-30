import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Entity({ name: 'orders'})
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
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    @JoinColumn({name: 'customer_id'})
    customer: Customer;
    
}