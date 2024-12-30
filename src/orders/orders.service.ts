import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Quote } from 'src/quote/entities/quote.entity';
import { Customer } from '../customers/entities/customer.entity';
import { PaginationDto } from 'src/common/pagination.dto';
import { CustomersService } from '../customers/customers.service';
import { QuoteService } from 'src/quote/quote.service';


@Injectable()
export class OrdersService {
  
  private readonly logger = new Logger('LogerService');
  customerId = this.customersService.customerId;
  // total: number = 0;

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
    private customersService: CustomersService,
    private quoteService: QuoteService,
  ) // private readonly dataSource: DataSource
  {}

  async create(data: any) {

    const user = await this.userRepository.findOneBy({ id: data.user });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const customer = await this.customerRepository.findOneBy({
      id: data.customer,
    });
    if (!customer) {
      throw new NotFoundException('customer not found');
    }

    //optimizar este codigo!!
    const quoteR = await this.quoteService.create();
    const quote = quoteR.id

    const newOrder = { quote, ...data };
    // const customer = this.customerId;
    // const newOrder = { customer, ...data }

    const order = this.orderRepository.create(newOrder);
    await this.orderRepository.save(order);

    this.customerId = customer.id;

    console.log('Desde ordersService', this.customerId);

    console.log(order)
    return order;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 50, offset = 0 } = paginationDto;

    const [orders, total] = await this.orderRepository.findAndCount({
      order: {
        id: "ASC"
      },
      take: limit,
      skip: offset,
      relations: { user: true, customer: true },
    });

    const ordersFlat = orders.map((order) => {
      const { user, customer, ...rest } = order;
      return {
        ...rest,
        user: user?.name,
        customer: customer?.name
      };
    });

    return {total, data: ordersFlat};
  }
  
  async findOne(id: number) {

    const order = await this.orderRepository.findOne({
      relations: {
        user: true,
        customer: true
      },
      where: {
        id:id
      }
    });

    return order;
  }

    // async findOne(id: number) {
  //   const order = await this.orderRepository.findOneBy({ id });
  //   return order;
  // }

  //Falta tipar updateOrderDto: any
  async update(id: number, updateOrderDto: UpdateOrderDto ) {

    try {
      await this.orderRepository.update({id}, updateOrderDto);
      return updateOrderDto;
    } catch (error) {
      this.handleDBExceptions(error);
    }


    // const order = await this.orderRepository.findOneBy({ id });
    //Falta implementar logica de update order
    // await this.orderRepository.update(order, updateOrderDto);
  }

  async remove(id: number) {
    const order = await this.orderRepository.delete({ id });
    return order;
  }


  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    console.log(error.code);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
  
}
