import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/params/Pagination';
import { Class } from 'src/typeOrm/entites/Class';
import { Etuidant } from 'src/typeOrm/entites/Etuidant';
import { User } from 'src/typeOrm/entites/User';
import { PaginatedResource } from 'src/utils/PaginatedResource';
import { etudiantsParams } from 'src/utils/util';
import { Repository } from 'typeorm';

@Injectable()
export class EtudiantsService {
    constructor(@InjectRepository(Etuidant) private etudiantsRepostory: Repository<Etuidant>) { }

    addEtudiants(etudiantsParams: etudiantsParams) {
        const addUser = this.etudiantsRepostory.create(etudiantsParams)
        return this.etudiantsRepostory.save(addUser)
    }
    updateEtudiants(id, etudiantsParams: etudiantsParams) {

        const etudiant = this.etudiantsRepostory.findOneBy(id)
        
        if (!etudiant) {

            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        else {
            return this.etudiantsRepostory.update(id, { ...etudiantsParams, updateAt: new Date() })


        }
    }
    getEtuidants() {
        return this.etudiantsRepostory.find({
            relations: { classe: true }
        })

    }

  public async getEtuidantsPagination(
    { page, limit, size, offset ,sortBy,order}: Pagination,

    
  ): Promise<PaginatedResource<Partial<Etuidant>>> {
 
     limit = size || 10; // Par défaut, taille de la page 10 si `size` n'est pas défini
     offset = (page - 1) * limit; // Calcul de l'index de départ
     const validSortFields = ['id', 'username', 'createdAt'];
     console.log('sortBy',sortBy,order);
     
  if (!validSortFields.includes(sortBy)) {
    throw new Error(`Invalid sort field: ${sortBy}`);
  }

    const [edtuidants, total] = await this.etudiantsRepostory.findAndCount({
        order: {
            [sortBy]: order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
          },
        relations:{classe:true},
      take: limit,
      skip: offset,
    });

    return {
      totalItems: total,
      items: edtuidants,
      page,
      size
    };
  }

    async search(keyword: string): Promise<Etuidant[]> {

        return this.etudiantsRepostory.createQueryBuilder('etuidant')
            .where('etuidant.username LIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('etuidant.email LIKE :keyword', { keyword: `%${keyword}%` }).getMany()
    }

    async filterBYClass(keyword: string): Promise<Etuidant[]> {

        return this.etudiantsRepostory.createQueryBuilder('etuidant')
            .where('etuidant.classeId LIKE :keyword', { keyword: `%${keyword}%` }).getMany()
    }


}
