import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CalendrierService } from './calendrier.service';
import { CreateCalendrierDto } from './dto/create-calendrier.dto';
import { UpdateCalendrierDto } from './dto/update-calendrier.dto';

@Controller('calendrier')
export class CalendrierController {
  constructor(private readonly calendrierService: CalendrierService) {}

  @Post()
  create(@Body() createCalendrierDto: CreateCalendrierDto) {
    return this.calendrierService.create(createCalendrierDto);
  }

  @Get()
  findAll() {
    return this.calendrierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendrierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalendrierDto: UpdateCalendrierDto) {
    return this.calendrierService.update(+id, updateCalendrierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendrierService.remove(+id);
  }
}
