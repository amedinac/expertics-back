import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";
import { Quote } from "../entities/quote.entity";
import { Part } from "src/parts/entities/part.entity";

export class CreateQuoteDetailDto {

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @IsPositive()
    unitPrice: number;

    @IsOptional()
    @Type(() => Quote)
    quote: Quote;

    @IsOptional()
    @Type(() => Part)
    part: Part;
}
