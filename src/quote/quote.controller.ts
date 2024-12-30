import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { CreateQuoteDetailDto } from './dto/create-quote-detail';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  // @Post()
  // create(@Body() createQuoteDto: CreateQuoteDto) {
  //   return this.quoteService.create(createQuoteDto);
  // }

  @Post()
  create() {
    return this.quoteService.create();
  }

  // @Post('quote_detail')
  // createQuoteDetail(@Body() createQuoteDetailDto: CreateQuoteDetailDto) {
  //   return this.quoteService.createQuoteDetail(createQuoteDetailDto);
  // }

  @Post('quote_detail')
  async createQuoteDetail(@Body() createQuoteDetailDto: CreateQuoteDetailDto) {
    return await this.quoteService.createQuoteDetail(createQuoteDetailDto);
  }

  @Get()
  findAll() {
    return this.quoteService.findAll();
  }

  @Get('quote_detail')
  findAllQuoteDetail() {
    return this.quoteService.findAllQuoteDetail();
  }

  @Get(':id')
  findQuote(@Param('id') id: number) {
    return this.quoteService.findQuote(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quoteService.update(+id, updateQuoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quoteService.remove(+id);
  }
}
