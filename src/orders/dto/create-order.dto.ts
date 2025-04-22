import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsDateString,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Quote } from 'src/quote/entities/quote.entity';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  serial: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  coverage: string;

  @IsString()
  @IsNotEmpty()
  vmi: string;

  @IsString()
  @IsNotEmpty()
  fail: string;


  @IsOptional()
  @Type(() => User)
  user: User;

  @IsOptional()
  @Type(() => Client)
  client: Client;

  @IsOptional()
  @Type(() => Quote)
  quote: Quote;
}
