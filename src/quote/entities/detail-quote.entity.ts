import { AfterInsert, AfterLoad, AfterUpdate, BeforeInsert, BeforeUpdate, Column, Entity, IsNull, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quote } from "./quote.entity";
import { Part } from "src/parts/entities/part.entity";


@Entity('detail_quote')
export class DetailQuote {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column('int')
    // quantity: number;

    @Column('decimal', {
        precision: 10,
        scale: 2,
        default: 0,
        transformer: {
            to: value => value,
            from: value => parseFloat(value)
        }
    })
    unitPrice: number;


    @Column('text')
    coverage: string;


    // @Column('decimal',{
    //     precision: 10,
    //     scale: 2,
    //     default: 0,
    //     transformer: { 
    //         to: value => value,
    //         from: value => parseFloat(value) 
    //     } }) 
    // subtotal: number;

    @ManyToOne(() => Quote, (quote) => quote.detailsQuote)
    @JoinColumn({ name: 'quote_id' })
    quote: Quote;

    @ManyToOne(() => Part, part => part.detailsquote)
    @JoinColumn({ name: 'part_id' })
    part: Part;


    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    calculateUnitPrice() {
        // this.subtotal = this.quantity * this.unitPrice;
        // console.log("subtotal", this.subtotal);
        this.unitPrice = this.part.cost * 1.3;
    }
}