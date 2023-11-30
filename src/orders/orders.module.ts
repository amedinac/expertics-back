import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Customer])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [
    TypeOrmModule
  ]
})
export class OrdersModule {}
