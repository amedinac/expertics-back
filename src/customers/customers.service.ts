import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger('LoggerService');

  public customerId: number;

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) // private readonly dataSource: DataSource
  {}

  get getCustomerId(): number {
    return this.customerId;
  }

  set setCustomerId(id: number) {
    this.customerId = id;
  }

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      await this.customerRepository
        .save(customer)
        // .then(customer => console.log("desde promesa", customer.id))
        .then((customer) => (this.setCustomerId = customer.id))
        .then(() => console.log('customer id guardado', this.customerId));

      //console.log(this.customerId)

      return customer;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const customers = await this.customerRepository.find();
    return customers;
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({
      relations: {
        orders: true
      },
      where: {
        id:id
      }
    })
    return customer;
  }

  async search(email: string) {
    // const customers = await this.customerRepository.findOneBy({ email });
    const customers = (await this.customerRepository.find()).filter(
      (customer) => customer.email.includes(email),
    );
    return customers;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      await this.customerRepository.update({id}, updateCustomerDto);
      return updateCustomerDto;
    
    } catch (error) {
      this.handleDBExceptions(error);
    }
    console.log(updateCustomerDto)
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
