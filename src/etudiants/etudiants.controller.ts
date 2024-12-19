import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseFilters } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { UpdateEtudiants } from 'src/user/dtos/UpdateEtudiantsDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/typeOrm/entites/Class';
import { Repository } from 'typeorm';
import { Etuidant } from 'src/typeOrm/entites/Etuidant';
import { User } from 'src/typeOrm/entites/User';
import { Pagination, PaginationParams } from 'src/params/Pagination';
import { PaginatedResource } from 'src/utils/PaginatedResource';
import { HttpExceptionFilter } from 'src/Exception';
@UseFilters(HttpExceptionFilter)

@Controller('etudiants')
export class EtudiantsController {
    constructor(private etudiantsServices:EtudiantsService,    @InjectRepository(Etuidant)
    private etudiantRepository: Repository<Etuidant>,   @InjectRepository(Class)
    private classRepository: Repository<Class>){

    }
    @Post('/add/:id')
    async create(@Body()data: { birthdate: number; userName: string; email?: string,createdAt?: Date },@Param("id") id:string,): Promise<Etuidant> {
        
        const classe = await this.classRepository.findOne({ where: { id: id } });
        if (!classe) throw new Error("Classe not found");

        const etudiant = this.etudiantRepository.create({
            username:data.userName,
            email: data.email ,
            birthdate: data.birthdate,
            createdAt:new Date()||data.createdAt,
            classe,
        });

        return await this.etudiantRepository.save(etudiant);
    }

    @Put('/update/:id')
    async updateEtudiant(@Body()data: UpdateEtudiants,@Param("id",ParseIntPipe) id:string){
             return await this.etudiantsServices.updateEtudiants(id,data)
    }
    @Get('/all')
    async getEtudiants(){
        return await this.etudiantsServices.getEtuidants()
    }
    @Get('search')
    async searchEtuidants(@Query('keyword') keyword:string){
        return this.etudiantsServices.search(keyword);
    }
    @Get("filter")
    async filterEtuidants(@Query('keyword') keyword:string){
        return this.etudiantsServices.filterBYClass(keyword)
    }

    @Get('pagination')
    @HttpCode(HttpStatus.OK)
    public async getEtuidantsPagination(
        @PaginationParams() paginationParams: Pagination,
    ): Promise<PaginatedResource<Partial<Etuidant>>> {
        return await this.etudiantsServices.getEtuidantsPagination(paginationParams);
    }

   
}
