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

  public async getUsers(
    { page, limit, size, offset }: Pagination,

  ): Promise<PaginatedResource<Partial<Etuidant>>> {
    const limitnew = size || 10; // Par défaut, taille de la page 10 si `size` n'est pas défini
    const offsetnew = (page - 1) * limitnew; // Calcul de l'index de départ
    console.log("pffest",offsetnew);
    
    const [users, total] = await this.etudiantsRepostory.findAndCount({
        relations:{classe:true},
      take: limitnew,
      skip: offsetnew,
    });

    return {
      totalItems: total,
      items: users,
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
