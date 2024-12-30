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
import { Customer } from 'src/customers/entities/customer.entity';
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
  @Type(() => Customer)
  customer: Customer;

  @IsOptional()
  @Type(() => Quote)
  quote: Quote;
}
