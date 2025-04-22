import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger('LoggerService');

  public clientId: number;

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) // private readonly dataSource: DataSource
  {}

  get getClientId(): number {
    return this.clientId;
  }

  set setClientId(id: number) {
    this.clientId = id;
  }

  async create(createClientDto: CreateClientDto) {
    try {
      const client = this.clientRepository.create(createClientDto);
      await this.clientRepository
        .save(client)
        // .then(customer => console.log("desde promesa", customer.id))
        .then((client) => (this.setClientId = client.id))
        .then(() => console.log('customer id guardado', this.clientId));

      //console.log(this.customerId)

      return client;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const clients = await this.clientRepository.find();
    return clients;
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOne({
      relations: {
        orders: true
      },
      where: {
        id:id
      }
    })
    return client;
  }

  async search(email: string) {
    // const customers = await this.customerRepository.findOneBy({ email });
    const clients = (await this.clientRepository.find()).filter(
      (client) => client.email.includes(email),
    );
    return clients;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      await this.clientRepository.update({id}, updateClientDto);
      return updateClientDto;
    
    } catch (error) {
      this.handleDBExceptions(error);
    }
    console.log(updateClientDto)
  }


  // ERROR: update or delete on table "customers" violates foreign key constraint "XX" on table "orders"
  // async remove(id: number) {
  //   const customer = await this.customerRepository.delete({ id });
  //   return customer;
  // }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    console.log(error.code);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
