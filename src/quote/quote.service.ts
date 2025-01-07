import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { CreateDetailQuoteDto } from './dto/create-detailQuote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { DetailQuote } from './entities/detail-quote.entity';
import { Any, Repository } from 'typeorm';

@Injectable()
export class QuoteService {

  constructor(
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
    @InjectRepository(DetailQuote) private detailQuoteRepository: Repository<DetailQuote>,
  ) { }



  async createQuote(createQuoteDto: CreateQuoteDto) {
    const newquote = this.quoteRepository.create(createQuoteDto);
    await this.quoteRepository.save(newquote);
    return newquote;
  } 

  async findQuote(id: number) {
    return await this.quoteRepository.findOne({
      where: { id },
      relations: ['detailsQuote'],
    });
  }

  async createDetailQuote(createDetailQuoteDto: CreateDetailQuoteDto) {
    const detailQuote = this.detailQuoteRepository.create(createDetailQuoteDto);
    await this.detailQuoteRepository.save(detailQuote);

    const { quote } = createDetailQuoteDto;
     const quoteToUpdate = await this.findQuote(+quote);
    
     // Calculate subtotal
     const { detailsQuote } = quoteToUpdate;
     quoteToUpdate.subtotal = detailsQuote.reduce((acc, detail) => acc + detail.subtotal, 0);

     // Update quote
     const updateQuoteDto: UpdateQuoteDto = {
       subtotal: quoteToUpdate.subtotal,
     }

    await this.updateQuote(+quote, updateQuoteDto);

    return detailQuote;
  }
 
  async findAll() {
    return await this.quoteRepository.find({
      relations: ['detailsQuote'],
    });
  }

  async findAllDetailQuote() {
    return await this.detailQuoteRepository.find({
      relations: ['part'],
    });
  }



  async findDetailQuotebyId(id: number) {
    return await this.detailQuoteRepository.findOne({
      where: { id },
      relations: ['quote', 'part'],
    });
  }

  async updateQuote(id: number, updateQuoteDto: UpdateQuoteDto) {
    try {
      return await this.quoteRepository.update({ id }, updateQuoteDto);
    }
    catch (error) {
      console.log(error);
  }
  }

  remove(id: number) {
    return `This action removes a #${id} quote`;
  }
}
