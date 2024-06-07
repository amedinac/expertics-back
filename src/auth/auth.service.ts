import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from './utils/handleBcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { password, email } = loginAuthDto;

    const userExist = await this.usersService.findOneByEmail(email);
    if (!userExist) {
      throw new NotFoundException('This user doesn´t exists!');
    }

    const validPassword = await compare(password, userExist.password);
    if (validPassword === false) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      role: userExist.role,
    };

    const token = this.jwtService.sign(payload);

    const data = {
      token,
      user: userExist,
    };

    return data;
  }
}
