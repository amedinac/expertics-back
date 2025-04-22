import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CustomRepositoryCannotInheritRepositoryError } from 'typeorm';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsString()
  // @IsNotEmpty()
  // lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
