import { AfterInsert, AfterLoad, AfterRemove, AfterUpdate, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetailQuote } from "./detail-quote.entity";
import { ConsoleLogger } from "@nestjs/common";

@Entity('quotes')
export class Quote {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createDate: Date;

    @Column('decimal', {
        precision: 10,
        scale: 2,
        default: 0,
        transformer: { 
            to: value => value,
            from: value => parseFloat(value) 
        } })
    subtotal: number;

    @Column('decimal', {
        precision: 10,
        scale: 2,
        default: 0,
        transformer: { 
            to: value => value,
            from: value => parseFloat(value) 
        } })
    tax: number;

    @Column('decimal', {
        precision: 10,
        scale: 2,
        default: 0,
        transformer: { 
            to: value => value,
            from: value => parseFloat(value) 
        } })
    total: number;

    @OneToMany(() => DetailQuote, detail => detail.quote)
    detailsQuote: DetailQuote[];

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    async calculateTotal() {
        this.tax = this.subtotal * 0.16;
        this.total = this.subtotal * 1.16;
    }
}
