import { AfterInsert, AfterUpdate, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    total: number;

    @OneToMany(() => DetailQuote, detail => detail.quote)
    detailsQuote: DetailQuote[];


    @BeforeInsert()
    @BeforeUpdate()
    updateTotal() {
        //  const total = this.detailsQuote?.reduce((acc, detail) => {
        //             acc + (detail.quantity * detail.unitPrice);
        //          console.log('Before Insert/Update!', total);
        //          return total
        //  }, 0);
        console.log('Before Insert/Update', this.total);

    }


    //Para calcular el total puedo actualizar el valor desde un servicio.
    //  @AfterInsert()
    //  @AfterUpdate()
    //  calculateTotal() {
    //       this.total = this.detailsQuote.reduce((acc, detail) => {
    //           return acc + (detail.quantity * detail.unitPrice);
    //      }, 0);
    //      console.log('After Insert/Update', this.total);
    //  }

}
