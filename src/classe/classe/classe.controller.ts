import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClasseService } from './classe.service';
import { CreateClassDto } from 'src/user/dtos/CreatedClassDto';

@Controller('classe')
export class ClasseController {
    constructor(private classeService:ClasseService){}

    @Get('/all')
    getUsers(){
        return this.classeService.getClass()
    }
    @Post('/add')
  async  addClass(@Body() createClassDto:CreateClassDto){
        return await this.classeService.addClass(createClassDto)

    }
}
