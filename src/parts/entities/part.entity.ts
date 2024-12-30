import { DetailQuote } from "src/quote/entities/detail-quote.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'parts'})
export class Part {
    @PrimaryColumn()
    id: string;

    @Column('text')
    model: string;

    @Column('text')
    description: string;

    @Column('float')
    oow: number;

    @Column('float')
    coreprice: number;

    @Column('float')
    cp_batt: number;

    @Column('float')
    cp_display: number;

    @Column('float')
    cp_display_bg: number;

    @Column('float')
    cp_bg: number;

    @Column('float', { default: 0 })
    cost: number;

    @OneToMany(() => DetailQuote, detail => detail.part)
    detailsquote: DetailQuote[];

    @BeforeInsert()
    @BeforeUpdate()
    calculateCost() {
        this.cost = this.oow - this.coreprice;
    }

}
