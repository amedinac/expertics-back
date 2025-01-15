import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { Quote } from "../entities/quote.entity";
import { Part } from "src/parts/entities/part.entity";

export class CreateDetailQuoteDto {

    // @IsNumber()
    // @IsPositive()
    // quantity: number;

    // @IsNumber()
    // @IsPositive()
    // unitPrice: number;

    @IsString()
    vmi: string;

    @IsOptional()
    @Type(() => Quote)
    quote: Quote;
    
    @IsOptional()
    @Type(() => Part)
    part: Part;
}
