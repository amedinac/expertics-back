import { AfterInsert, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quote } from "./quote.entity";
import { Part } from "src/parts/entities/part.entity";


@Entity('detail_quote')
export class DetailQuote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    unitPrice: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0}) 
    subtotal: number;

    @ManyToOne(() => Quote, quote => quote.detailsQuote)
    @JoinColumn({ name: 'quote_id'})
    quote: Quote;

    @ManyToOne(() => Part, part => part.detailsquote )
    @JoinColumn({ name: 'part_id'})
    part: Part;

    @BeforeInsert()
    @BeforeUpdate()
    calculateSubtotal() {
        this.subtotal = this.quantity * this.unitPrice;
        console.log('Before Insert', this.subtotal);
    }
    
}