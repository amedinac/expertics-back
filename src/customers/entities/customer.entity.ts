import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customers'})
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    // @Column('text')
    // lastname: string;

    @Column('text')
    email: string;

    @Column('text')
    phone: string;


}
