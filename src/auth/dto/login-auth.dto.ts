import { IsEmail, IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class LoginAuthDto {
 
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsOptional()
  remember: boolean;
}
