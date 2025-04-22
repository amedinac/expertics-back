import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from './pdf-reports';
import { OrdersService } from '../orders/orders.service';


@Injectable()
export class ReportsService { 

  constructor(
    private readonly printerService: PrinterService,
    private readonly ordersService: OrdersService ){
    
  }


  async getOrderById(orderId: number){

    const order = await this.ordersService.findOne(orderId);


//cambiar despues nombre getHello...
   const docDefinition = getHelloWorldReport({
    id: order.id,
    serial: order.serial,
    description: order.description,
    coverage: order.coverage,
    vmi: order.vmi,
    fail: order.fail,
    createdDate: order.createdDate,
    userName: order.user.name,
    clientName: order.client.name,
    clientEmail: order.client.email,
    clientPhone: order.client.phone,
   });

    const doc = this.printerService.createPdf(docDefinition)

    return doc;
  }
 }
