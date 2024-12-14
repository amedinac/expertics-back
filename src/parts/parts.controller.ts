import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Post()
  create(@Body() createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto);
  }

  // @Get()
  // findAll() {
  //   return this.partsService.findAll();
  // }

  @Get()
  upload(){
    this.partsService.loadExcel('parts-data.xlsx');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartDto: UpdatePartDto) {
    return this.partsService.update(id, updatePartDto);
  }

  //Delete no es tan necesario, ya que no requiero que una parte se borre para no violar la integridad
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partsService.remove(+id);
  }
}
