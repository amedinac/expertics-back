import { Injectable } from '@nestjs/common';
import { seed } from './seed-data';

import { UsersService } from 'src/users/users.service';
import { ClientsService } from 'src/clients/clients.service';
import { OrdersService } from 'src/orders/orders.service';


@Injectable()
export class SeedService {
  
  constructor(
    private readonly userService: UsersService,
    private readonly clientsService: ClientsService,
    private readonly orderService: OrdersService
  ){}

  async runSeed(){

    await this.insertUsers();
    await this.insertClients();
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

  private async insertClients(){

    const clients = seed.clients;
    const insertPromises = [];


    clients.forEach ( client => {
      insertPromises.push ( this.clientsService.create(client));
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
