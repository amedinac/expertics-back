import { Module } from '@nestjs/common';

import { OrdersModule } from 'src/orders/orders.module';
import { UsersModule } from 'src/users/users.module';
import { CustomersModule } from 'src/customers/customers.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    OrdersModule,
    UsersModule,
    CustomersModule
  ]
})
export class SeedModule {}
