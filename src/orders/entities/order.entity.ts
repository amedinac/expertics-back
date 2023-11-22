import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

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
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({name: 'user_id'})
    user: User;
}