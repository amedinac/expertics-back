import { AfterInsert, AfterUpdate, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetailQuote } from "./detail-quote.entity";

@Entity('quotes')
export class Quote {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createDate: Date;

    @Column('decimal', { precision: 10, scale: 2, default: 0})
    total: number;

    @OneToMany(() => DetailQuote, detail => detail.quote)
    detailsQuote: DetailQuote[];

    async updateTotal(): Promise<void> {
        if(this.detailsQuote){
            this.total = this.detailsQuote.reduce((acc, detail) => {
                return acc + (detail.quantity * detail.unitPrice);
            }, 0);
        }
    }

    //Para calcular el total puedo actualizar el valor desde un servicio.
    // @AfterInsert()
    // @BeforeUpdate()
    // calculateTotal() {
    //      this.total = this.detailsQuote.reduce((acc, detail) => {
    //          return acc + (detail.quantity * detail.unitPrice);
    //     }, 0);
    //     console.log('After Insert/Update', this.total);
    // }
    
}
