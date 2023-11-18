import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/typeOrm/entites/Class';
import { classParams } from 'src/utils/util';
import { Repository } from 'typeorm';

@Injectable()
export class ClasseService {
    constructor(@InjectRepository(Class) private classRepository:Repository<Class>){}

    getClass(){
        return this.classRepository.find()
    }
    addClass(classParams:classParams){
        const classe=this.classRepository.create(classParams)
        return this.classRepository.save(classe)
        
    }
}
