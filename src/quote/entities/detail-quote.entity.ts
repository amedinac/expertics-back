import { AfterInsert, AfterLoad, AfterRemove, AfterUpdate, BeforeInsert, BeforeUpdate, Column, Entity, IsNull, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quote } from "./quote.entity";
import { Part } from "src/parts/entities/part.entity";
import { UpdateQuoteDto } from "../dto/update-quote.dto";
import { QuoteService } from '../quote.service';


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
    QuoteService: any;


    @AfterLoad()
    @AfterInsert()
    // @AfterUpdate()
    // @AfterRemove()
    async calculateUnitPrice() {
        // this.subtotal = this.quantity * this.unitPrice;
    
        this.unitPrice = this.part.cost * 1.3;
        console.log("unitPrice", this.unitPrice);
    }


   // No funciona
    @AfterRemove()
    async calculateSubtotal() {
        const quoteToUpdate = this.quote;
        const { detailsQuote } = quoteToUpdate;
        quoteToUpdate.subtotal = detailsQuote.reduce((acc, detail) => acc + detail.unitPrice, 0);

        const updateQuoteDto: UpdateQuoteDto = {
            subtotal: quoteToUpdate.subtotal,
        }

        await this.QuoteService.updateQuote(this.quote, updateQuoteDto);
    }
}