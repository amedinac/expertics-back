import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {

  private readonly logger = new Logger('LoggerService');

  public customerId: number;

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    // private readonly dataSource: DataSource
  ){}

  get getCustomerId(): number {
    return this.customerId;
  }
 
  set setCustomerId(id: number) {
    this.customerId = id;
  }


  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      await this.customerRepository.save(customer)
        // .then(customer => console.log("desde promesa", customer.id))
        .then(customer => this.setCustomerId = customer.id)
        .then(() => console.log("id guardado", this.customerId))

      //console.log(this.customerId)
      
      return customer; 
      

    } catch (error) {
      this.handleDBExceptions(error)
    }
 
  }


  async findAll() {
    const customers = await this.customerRepository.find();

    return customers;
  }

  async findOne(email: string) {
    const customer = await this.customerRepository.findOneBy({email})

    // this.customerId = customer.id;
    return customer;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }

  private handleDBExceptions(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    console.log(error.code)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
