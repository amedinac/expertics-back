import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  role: string;
}
