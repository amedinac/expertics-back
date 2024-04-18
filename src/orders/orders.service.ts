import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { PaginationDto } from 'src/common/pagination.dto';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class OrdersService {

  customerId = this.customersService.customerId;

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    private customersService: CustomersService,
    // private readonly dataSource: DataSource
  ) { }


  async create(data: any) {
    const user = await this.userRepository.findOneBy({ id: data.user })
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const customer = await this.customerRepository.findOneBy({ id: data.customer })
    if (!customer) {
      throw new NotFoundException('customer not found');
    }

    // const customer = this.customerId;
    // const newOrder = { customer, ...data }


    const order = this.orderRepository.create(data);
    await this.orderRepository.save(order);

    console.log('Desde ordersService', this.customerId);

    return order;
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 100, offset = 0 } = paginationDto;

    const orders = await this.orderRepository.find({
      take: limit,
      skip: offset,
      relations: { user: true, customer: true },
    });

    orders.sort((a, b) => a.id - b.id);

    const ordersFlat = orders.map(order => {
      const { user, customer, ...rest } = order;
      return {
        ...rest,
        user: user?.name,
        customer: customer?.email
      };
    });

    return ordersFlat;

  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOneBy({ id })
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ id })

    // await this.orderRepository.update(order, updateOrderDto);



  }

  async remove(id: number) {
    const order = await this.orderRepository.delete({ id })
    return order;
  }
}


