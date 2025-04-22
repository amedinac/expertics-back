import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Quote } from 'src/quote/entities/quote.entity';
import { Client } from '../clients/entities/client.entity';
import { PaginationDto } from 'src/common/pagination.dto';
import { ClientsService } from '../clients/clients.service';
import { QuoteService } from 'src/quote/quote.service';


@Injectable()
export class OrdersService {
  
  private readonly logger = new Logger('LoggerService');
  clientId = this.clientsService.clientId;
  // total: number = 0;

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
    private clientsService: ClientsService,
    private quoteService: QuoteService,
  ) // private readonly dataSource: DataSource
  {}

  async create(data: any) {

    const user = await this.userRepository.findOneBy({ id: data.user });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const client = await this.clientRepository.findOneBy({
      id: data.client,
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const quote = await this.quoteService.createQuote();

    const newOrder = {quote: quote.id, ...data};
    

    const order = this.orderRepository.create(newOrder);
    await this.orderRepository.save(order);

    this.clientId = client.id;

    console.log('Desde ordersService', this.clientId);

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
      relations: { user: true, client: true },
    });

    const ordersFlat = orders.map((order) => {
      const { user, client, ...rest } = order;
      return {
        ...rest,
        user: user?.name,
        client: client?.name
      };
    });

    return {total, data: ordersFlat};
  }
  
  async findOne(id: number) {
    return await this.orderRepository.findOne({
      where: {id},
      relations: ['user', 'client', 'quote']
    });
  }

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
