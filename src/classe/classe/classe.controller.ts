import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClasseService } from './classe.service';
import { CreateClassDto } from 'src/user/dtos/CreatedClassDto';
import { EtudiantsService } from 'src/etudiants/etudiants.service';

@Controller('classe')
export class ClasseController {
    constructor(private classeService:ClasseService,private etuidatnsServices:EtudiantsService){}

    @Get('/all')
    getUsers(){
        return this.classeService.getClass()
    }
    @Post('/add')
  async  addClass(@Body() createClassDto:CreateClassDto){
        return await this.classeService.addClass(createClassDto)

    }
    @Get(':id/allEduitans')
        async getEtudiantsByIdClass(@Param('id') id:any){
         const etudiants= await this.etuidatnsServices.getEtuidants()
         console.log("etud",etudiants);
         
       return  etudiants.filter(elm=>elm.classe.id==id)
         
    }
}
