import { IsNumber, IsOptional } from "class-validator";

export class CreateQuoteDto {

    @IsNumber()
    @IsOptional()
    total: number;
}
