import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*
  @Post('login')
  async login(@Request() req){
    return this.authService.login(req.user);
  }
  */

  @Post('login')
  @HttpCode(200)
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
