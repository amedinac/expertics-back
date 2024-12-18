import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quote } from "./quote.entity";
import { Part } from "src/parts/entities/part.entity";


@Entity('detail_quote')
export class DetailQuote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    unitPrice: number;

    @ManyToOne(() => Quote, quote => quote.detailsQuote)
    @JoinColumn({ name: 'quote_id'})
    quote: Quote;

    @ManyToOne(() => Part, part => part.detailsquote )
    @JoinColumn({ name: 'part_id'})
    part: Part;
}