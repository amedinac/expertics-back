import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { CustomersService } from 'src/customers/customers.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Quote } from 'src/quote/entities/quote.entity';
import { QuoteModule } from 'src/quote/quote.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Customer, Quote]), QuoteModule],
  controllers: [OrdersController],
  providers: [OrdersService, CustomersService],
  exports: [TypeOrmModule, OrdersService],
})
export class OrdersModule {}
