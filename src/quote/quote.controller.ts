import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { CreateDetailQuoteDto } from './dto/create-detailQuote.dto';

@Controller('quotes')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  // @Post()
  // create(@Body() createQuoteDto: CreateQuoteDto) {
  //   return this.quoteService.create(createQuoteDto);
  // }

  @Post()
  createQuote() {
    return this.quoteService.createQuote();
  }

  // @Post('quote_detail')
  // createQuoteDetail(@Body() createQuoteDetailDto: CreateQuoteDetailDto) {
  //   return this.quoteService.createQuoteDetail(createQuoteDetailDto);
  // }

  @Post('detail_quote')
  createDetailQuote(@Body() createDetailQuoteDto: CreateDetailQuoteDto) {
    return this.quoteService.createDetailQuote(createDetailQuoteDto);
  }

  @Get()
  findAll() {
    return this.quoteService.findAll();
  }

  @Get('detail_quote')
  findAllDetailQuote() {
    return this.quoteService.findAllDetailQuote();
  }

  @Get('detail_quote/:id')
  findDetailQuotebyId(@Param('id') id: number) {
    return this.quoteService.findDetailQuotebyId(+id);
  }

  @Get(':id')
  findQuote(@Param('id') id: string) {
    return this.quoteService.findQuote(id);
  }

  @Patch(':id')
  updateQuote(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quoteService.updateQuote(id, updateQuoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quoteService.remove(+id);
  }

  @Delete('detail_quote/:id')
  deleteDetail(@Param('id') id: string) {
    return this.quoteService.deleteDetail(+id);
  }

}
