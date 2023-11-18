import { Body, Controller, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { CreateEtudiants } from 'src/user/dtos/CreatedEtudiantsDto';
import { UpdateEtudiants } from 'src/user/dtos/UpdateEtudiantsDto';

@Controller('etudiants')
export class EtudiantsController {
    constructor(private etudiantsServices:EtudiantsService){

    }
    @Post('/add')
  async  addEtudiant(@Body() createEtudiantsDto:CreateEtudiants){
        return await this.etudiantsServices.addEtudiants(createEtudiantsDto)

    }

    @Put(':id')
    async updateEtudiant(@Param("id",ParseIntPipe) id:string,@Body() updateEtudiants:UpdateEtudiants){
             return await this.etudiantsServices.updateEtudiants(id,updateEtudiants)
    }
}
