import { Injectable } from '@nestjs/common';
import { CreateCalendrierDto } from './dto/create-calendrier.dto';
import { UpdateCalendrierDto } from './dto/update-calendrier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendrier } from './entities/calendrier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CalendrierService {
  constructor(@InjectRepository(Calendrier) private readonly calendierRepository:Repository<Calendrier> ){

  }
  create(createCalendrierDto: CreateCalendrierDto) {
    const calendrier=this.calendierRepository.create(createCalendrierDto)
    return this.calendierRepository.save(calendrier);
  }

  findAll() {
    return `This action returns all calendrier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calendrier`;
  }

  update(id: number, updateCalendrierDto: UpdateCalendrierDto) {
    return `This action updates a #${id} calendrier`;
  }

  remove(id: number) {
    return `This action removes a #${id} calendrier`;
  }
}
