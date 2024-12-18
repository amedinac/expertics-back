import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetailQuote } from "./detail-quote.entity";

@Entity('quotes')
export class Quote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column('decimal', { precision: 10, scale: 2})
    total: number;

    @OneToMany(() => DetailQuote, detail => detail.quote)
    detailsQuote: DetailQuote[];
}
