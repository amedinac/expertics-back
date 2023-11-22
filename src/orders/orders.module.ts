import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [
    TypeOrmModule
  ]
})
export class OrdersModule {}
