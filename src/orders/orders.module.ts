import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { ClientsService } from 'src/clients/clients.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Quote } from 'src/quote/entities/quote.entity';
import { QuoteModule } from 'src/quote/quote.module';
import { QuoteService } from 'src/quote/quote.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Client, Quote]), QuoteModule],
  controllers: [OrdersController],
  providers: [OrdersService, ClientsService],
  exports: [TypeOrmModule, OrdersService],
})
export class OrdersModule {}
