import { Body, HttpException, HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { HttpExceptionFilter } from 'src/Exception';
import { Class } from 'src/typeOrm/entites/Class';
import { Etuidant } from 'src/typeOrm/entites/Etuidant';
import { UserNotFoundException } from 'src/typeOrm/error/userNotFoundExeception';
import { CreateClassDto } from 'src/user/dtos/CreatedClassDto';
import { classParams } from 'src/utils/util';
import { Repository } from 'typeorm';

@Injectable()
export class ClasseService {
    constructor(@InjectRepository(Class) private classRepository:Repository<Class>){}

    getClass(){
        return this.classRepository.find(
            {relations:{etuidants:true}}

        )
    }
    async addClass(createClassDto: CreateClassDto): Promise<Class> {
        const newClass = this.classRepository.create(createClassDto); // Prépare l'entité
        return await this.classRepository.save(newClass); // Enregistre dans la base de données
      }

 async   getClassById(id:string):Promise<Class>{
    const classe= await   this.classRepository.findOne({ where: { id: id },relations:{etuidants:true} })
        console.log('classe',classe);
        
        if(!classe){
            throw new UserNotFoundException(id);

            // throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        }
        return classe
   }
}
