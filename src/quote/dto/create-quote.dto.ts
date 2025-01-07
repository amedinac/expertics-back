import { IsNumber, IsOptional } from "class-validator";

export class CreateQuoteDto {

    @IsNumber()
    subtotal: number;

    @IsNumber()
    total: number;

}
