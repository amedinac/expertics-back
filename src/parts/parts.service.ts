import { Injectable } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from './entities/part.entity';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';



@Injectable()
export class PartsService {

  constructor(
    @InjectRepository(Part)
    private partRepository: Repository<Part>
  ){}

  

  async loadExcel(filePath: string){
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    try {
      // Guardar archivo JSON
      fs.writeFileSync('parts-data.json', JSON.stringify(data, null, 2));
      console.log('Archivo JSON guardado exitosamente');
      await this.importdata();
    } catch (error) {
      console.error('Error al guardar el archivo JSON:', error);
    }
  }

  async importdata(){
    const jsonPath = path.join(process.cwd(), 'parts-data.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    const parts = [];

    jsonData.forEach(part => {
      parts.push(this.create(part));
    });

    await Promise.all(parts);
    console.log('List Parts correctly populate the database.!!!')

  }

  async create(createPartDto: CreatePartDto) {
    try {
      const part = this.partRepository.create(createPartDto);
      await this.partRepository
        .save(part);
    } catch (error) {
      //Falta implementar excepcion.
      console.log(error);
    }

  }

  async findAll() {
    const parts = await this.partRepository.find();
    return parts;
  }

  async findOne(id: string) {
    const part = await this.partRepository.findOneBy({id})
    return part;
  }

  async update(id: string, updatePartDto: UpdatePartDto) {
    try {
      await this.partRepository.update({id}, updatePartDto);
      return updatePartDto;
    } catch (error){
      //Falta implementar excepcion.
      console.log(error);

    }
  }

  remove(id: number) {
    return `This action removes a #${id} part`;
  }
}
