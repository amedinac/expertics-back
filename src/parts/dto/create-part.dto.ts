import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreatePartDto {

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    oow: number;

    @IsOptional()
    coreprice: number;

    @IsOptional()
    cp_batt: number;

    @IsOptional()
    cp_display: number;

    @IsOptional()
    cp_display_bg: number;

    @IsOptional()
    cp_bg: number;


}
