import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text', {unique:true})
    email: string;

    @Column('text')
    password: string;

    @Column('text')
    role: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]
}