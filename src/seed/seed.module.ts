import { Module } from '@nestjs/common';

import { OrdersModule } from 'src/orders/orders.module';
import { UsersModule } from 'src/users/users.module';
import { ClientsModule } from 'src/clients/clients.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    OrdersModule,
    UsersModule,
    ClientsModule
  ]
})
export class SeedModule {}
