import { Controller, Get, Param, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('/:orderId')
  async getOrderById(@Res() response: Response, @Param('orderId') orderId: string){
    const pdfDoc = await this.reportsService.getOrderById(+orderId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(response);
    pdfDoc.end()

  }
}
