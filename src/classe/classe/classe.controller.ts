import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, Query, UseFilters, UseInterceptors } from '@nestjs/common';
import { ClasseService } from './classe.service';
import { CreateClassDto } from 'src/user/dtos/CreatedClassDto';
import { HttpExceptionFilter } from 'src/Exception';
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor)

@Controller('classe')
export class ClasseController {
    constructor(private classeService:ClasseService){}

    @Get('/all')
    getUsers(){
        return this.classeService.getClass()
    }
    @Post('/add')
    addClass(@Body() createClassDto:CreateClassDto){
        return  this.classeService.addClass(createClassDto)

    }

    @Get(':id')
    getClass(@Param('id',ParseIntPipe) id:string){
        return this.classeService.getClassById(id)

    }

   

}
