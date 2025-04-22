import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { CreateDetailQuoteDto } from './dto/create-detailQuote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { DetailQuote } from './entities/detail-quote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuoteService {

  constructor(
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
    @InjectRepository(DetailQuote) private detailQuoteRepository: Repository<DetailQuote>,
  ) { }



  async createQuote() {
    const newquote = this.quoteRepository.create();
    await this.quoteRepository.save(newquote);
    return newquote;
  } 

  async findQuote(id: string) {
    return await this.quoteRepository.findOne({
      where: { id },
      relations: ['detailsQuote', 'detailsQuote.part'],
    });
  }

  async createDetailQuote(createDetailQuoteDto: CreateDetailQuoteDto) {
    const detailQuote = this.detailQuoteRepository.create(createDetailQuoteDto);
    await this.detailQuoteRepository.save(detailQuote);

    const { quote, part } = createDetailQuoteDto;
     const quoteToUpdate = await this.findQuote(quote.id);
    
     // Calculate subtotal of quote
     const { detailsQuote } = quoteToUpdate;
     quoteToUpdate.subtotal = detailsQuote.reduce((acc, detail) => acc + detail.unitPrice, 0);

     // Update quote
     const updateQuoteDto: UpdateQuoteDto = {
       subtotal: quoteToUpdate.subtotal,
     }

    await this.updateQuote(quote.id, updateQuoteDto);

    return detailQuote;
  }
 
  async findAll() {
    return await this.quoteRepository.find({
      // relations: ['detailsQuote'],

      relations: ['detailsQuote', 'detailsQuote.part'],
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


  async updateQuote(id: string, updateQuoteDto: UpdateQuoteDto) {
    try {
        const quote = await this.quoteRepository.findOne({ where: { id } });
        if (!quote) {
            throw new Error('Quote not found');
        }
        
        // Actualizar totales
        quote.subtotal = updateQuoteDto.subtotal;
        quote.total = quote.subtotal * 1.16;

        return await this.quoteRepository.save(quote);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

  remove(id: number) {
    return `This action removes a #${id} quote`;
  }

  async deleteDetail(id: number) {
    await this.detailQuoteRepository.delete(id);
    return { message: 'Detail quote deleted' };
  }
}
