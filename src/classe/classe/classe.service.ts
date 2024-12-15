import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/typeOrm/entites/Class';
import { Etuidant } from 'src/typeOrm/entites/Etuidant';
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
}
