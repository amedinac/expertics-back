import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Order } from '../orders/entities/order.entity';
import { encrypt } from 'src/auth/utils/handleBcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  public userId: number;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}


  get getUserId(): number {
    return this.userId;
  }

  set setUserId(id: number) {
    this.userId = id;
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;

    try {
      const userParse = {
        ...user,
        password: await encrypt(password),
      };

      const newUser = this.userRepository.create(userParse);
      await this.userRepository
        .save(newUser)
        .then((newUser) => (this.setUserId = newUser.id))
        .then(() => console.log('User id guardado.', this.userId))
      return newUser;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    console.log(user);
    return user;
  }

   async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...user } = updateUserDto;

    try {
      // const userParse = {
      //   ...user,
      //   password: await encrypt(password)
      // }
      await this.userRepository.update({ id }, updateUserDto);
      return updateUserDto;
    } catch (error) {
      this.handleDBExceptions(error);
    }

    /*
  await this.dataSource
  .createQueryBuilder()
  .update(User)
  .set(user)
  .where("id = :id", {id})
  .execute()
  */
  }

  async delete(id: number) {
    const user = await this.findOneById(id);
    await this.userRepository.delete(user.id);
    return { userDeleted: true, email: user.email };
  }

  private handleDBExceptions(error: any) {
    console.log(error);
    this.logger.error(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
