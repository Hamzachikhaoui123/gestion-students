import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { UpdateEtudiants } from 'src/user/dtos/UpdateEtudiantsDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/typeOrm/entites/Class';
import { Repository } from 'typeorm';
import { Etuidant } from 'src/typeOrm/entites/Etuidant';

@Controller('etudiants')
export class EtudiantsController {
    constructor(private etudiantsServices:EtudiantsService,    @InjectRepository(Etuidant)
    private etudiantRepository: Repository<Etuidant>,   @InjectRepository(Class)
    private classRepository: Repository<Class>){

    }
    @Post('/add/:id')
    async create(@Body()data: { birthdate: number; userName: string; email?: string,createdAt?: Date },@Param("id") id:string,): Promise<Etuidant> {
        console.log("id",id,data);
        
        const classe = await this.classRepository.findOne({ where: { id: id } });
        if (!classe) throw new Error("Class not found");

        const etudiant = this.etudiantRepository.create({
            username:data.userName,
            email: data.email ,
            birthdate: data.birthdate,
            createdAt:new Date()||data.createdAt,
            classe,
        });

        return await this.etudiantRepository.save(etudiant);
    }

    @Put(':id')
    async updateEtudiant(@Param("id",ParseIntPipe) id:string,@Body() updateEtudiants:UpdateEtudiants){
             return await this.etudiantsServices.updateEtudiants(id,updateEtudiants)
    }
    @Get('/all')
    async getEtudiants(){
        return await this.etudiantsServices.getEtuidants()
    }
    
}
