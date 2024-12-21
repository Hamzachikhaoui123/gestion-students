import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseFilters } from '@nestjs/common';
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
import { GetUsersDto } from 'src/user/dtos/GetUserDto';
import { PaginationParamsDto } from 'src/user/dtos/PaginationParamsDto';
import { CreateUserDto } from 'src/user/dtos/CreatedUserDto';
import { CreatedEtudiantsDto } from 'src/user/dtos/CreatedEtudiantsDto';
@UseFilters(HttpExceptionFilter)

@Controller('etudiants')
export class EtudiantsController {
    constructor(private etudiantsServices:EtudiantsService){

    }
    @Post('/add/:id')
    async create(@Body()data: CreatedEtudiantsDto,@Param("id",ParseIntPipe) id:string): Promise<Etuidant> {
        return this.etudiantsServices.addEtudiants(id,data)
      
    }

    @Put('/update/:id')
    async updateEtudiant(@Body()data: UpdateEtudiants,@Param("id",ParseIntPipe) id:string): Promise<Etuidant> {
             return  this.etudiantsServices.updateEtudiants(id,data)
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
    @Get("static")
    async staticEtuidants(@Query('keyword') keyword:string){
        return this.etudiantsServices.staticEtudiants(keyword)
    }

    @Get('pagination')
    @HttpCode(HttpStatus.OK)
    public async getEtuidantsPagination(
        @PaginationParams() paginationParams: Pagination,
    
    ): Promise<PaginatedResource<Partial<Etuidant>>> {
        return await this.etudiantsServices.getEtuidantsPagination(paginationParams);
    }
  
    
   
}
