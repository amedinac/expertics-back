import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { CreateQuoteDetailDto } from './dto/create-quote-detail';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { DetailQuote } from './entities/detail-quote.entity';
import { Any, Repository } from 'typeorm';
import { get } from 'http';

@Injectable()
export class QuoteService {

  constructor(
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
    @InjectRepository(DetailQuote) private detailQuoteRepository: Repository<DetailQuote>,
  ) {}



  async create() {
    const quote = this.quoteRepository.create();
    await this.quoteRepository.save(quote);
    return quote;
  }

  async createQuoteDetail(createQuoteDetailDto: CreateQuoteDetailDto) {
    //Create new detail quote
    const detailQuote = this.detailQuoteRepository.create(createQuoteDetailDto);

    //Get the quote
    const quote = await this.quoteRepository.findOne({
      where: { id: createQuoteDetailDto.quote.id },
      relations: ['detailsQuote'],
    });



    if(!quote){
      throw new Error('Quote not found');
    }

    //Assign the quote to the detail quote
    detailQuote.quote = quote;

    //Save the detail quote
    console.log('New Detail Quote =>',detailQuote);
    await this.detailQuoteRepository.save(detailQuote);

    //Update the total of the quote
    await quote.updateTotal();
    await this.quoteRepository.save(quote);

    return detailQuote;
  }

  async findAll() {
    return await this.quoteRepository.find({
      relations: ['detailsQuote'],
    });
  }

  async findAllQuoteDetail() {
    return await this.detailQuoteRepository.find({
      relations: ['quote', 'part'],
    });
  }

  async findQuote(id: number) {
    return await this.quoteRepository.findOne({
      where: { id },
      relations: ['detailsQuote'],
    });
  }

  update(id: number, updateQuoteDto: UpdateQuoteDto) {
    return `This action updates a #${id} quote`;
  }

  remove(id: number) {
    return `This action removes a #${id} quote`;
  }
}
