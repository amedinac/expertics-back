import { IsNumber, IsOptional } from "class-validator";

export class CreateQuoteDto {

    @IsNumber()
    @IsOptional()
    subtotal: number;

    @IsOptional()
    @IsNumber()
    total: number;

}
