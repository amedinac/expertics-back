import { Injectable } from '@nestjs/common';
import { seed } from './seed-data';

import { UsersService } from 'src/users/users.service';
import { CustomersService } from 'src/customers/customers.service';
import { OrdersService } from 'src/orders/orders.service';


@Injectable()
export class SeedService {
  
  constructor(
    private readonly userService: UsersService,
    private readonly customerService: CustomersService,
    private readonly orderService: OrdersService
  ){}

  async runSeed(){

    await this.insertUsers();
    await this.insertCustomers();
    await this.insertOrders();

    return 'Seed executed correctly'
  }



  private async insertUsers(){

    const users = seed.users;
    const insertPromises = [];


    users.forEach( user => {
      insertPromises.push( this.userService.create(user));
    });

    await Promise.all(insertPromises);


  }

  private async insertCustomers(){

    const customers = seed.customers;
    const insertPromises = [];


    customers.forEach ( customer => {
      insertPromises.push ( this.customerService.create(customer));
    });

    await Promise.all(insertPromises);

    
  }

  private async insertOrders(){

    const orders = seed.orders;
    const insertPromises = [];

    orders.forEach( order => {
      insertPromises.push( this.orderService.create(order));
    });

    await Promise.all(insertPromises);

  }
}
