import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/typeOrm/entites/Class';
import { Etuidant } from 'src/typeOrm/entites/Etuidant';
import { etudiantsParams } from 'src/utils/util';
import { Repository } from 'typeorm';

@Injectable()
export class EtudiantsService {
    constructor(@InjectRepository(Etuidant) private etudiantsRepostory:Repository<Etuidant>){}

    addEtudiants(etudiantsParams:etudiantsParams){
        const addUser= this.etudiantsRepostory.create(etudiantsParams)
        return this.etudiantsRepostory.save(addUser)
    }
    updateEtudiants(id, etudiantsParams:etudiantsParams){
        const etudiant=this.etudiantsRepostory.findOneBy(id)
        if(!etudiant){
             throw new HttpException('Not Found',HttpStatus.NOT_FOUND)
        }
        else {
         return  this.etudiantsRepostory.update(id,{...etudiantsParams,updateAt:new Date()})
           

        }
    }
    getEtuidants(){
        return this.etudiantsRepostory.find({
            relations:{classe:true}
        })
    }


}
