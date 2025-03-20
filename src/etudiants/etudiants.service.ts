import { HttpException, HttpStatus, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClasseService } from 'src/classe/classe/classe.service';
import { Pagination } from 'src/params/Pagination';
import { Class } from 'src/typeOrm/entites/Class';
import { Etudiant } from 'src/typeOrm/entites/Etudiant';
import { User } from 'src/typeOrm/entites/User';
import { PaginatedResource } from 'src/utils/PaginatedResource';
import { etudiantsParams } from 'src/utils/util';
import { Repository } from 'typeorm';

@Injectable()
export class EtudiantsService {
    constructor(@InjectRepository(Etudiant) private etudiantsRepostory: Repository<Etudiant>,   @InjectRepository(Class)
    private classRepository: Repository<Class>) { }

    async addEtudiants(id, etudiantsParams: etudiantsParams) {
      const classe = await this.classRepository.findOne({ where: { id: id } });
      
      if (!classe) throw new Error("Classe not found");

      const etudiant = this.etudiantsRepostory.create( {...etudiantsParams,createdAt:new Date(),classe:classe,password:'1221222525',updateAt:new Date()});

      return await this.etudiantsRepostory.save(etudiant);
   
    }
  async  updateEtudiants(id, etudiantsParams: etudiantsParams){
    const updateResult = await this.etudiantsRepostory.update(id, etudiantsParams);

    if (updateResult.affected === 1) {
      // Récupérer l'objet mis à jour
      return await this.etudiantsRepostory.findOne({ where: { id },relations:{classe:true} });
    } else {
      throw new NotFoundException(`Etudiant avec l'ID ${id} non trouvé.`);
    }
    }
    getEtudiants() {
        return this.etudiantsRepostory.find({
            relations: { classe: true }
        })

    }

  public async getEtudiantsPagination(
    { page, limit, size, offset ,sortBy,order}: Pagination,

    
  ): Promise<PaginatedResource<Partial<Etudiant>>> {
 
     limit = size || 10; // Par défaut, taille de la page 10 si `size` n'est pas défini
     offset = (page - 1) * limit; // Calcul de l'index de départ
     const validSortFields = ['id', 'username', 'createdAt'];
     
  if (!validSortFields.includes(sortBy)) {
    throw new Error(`Invalid sort field: ${sortBy}`);
  }

    const [etudiants, total] = await this.etudiantsRepostory.findAndCount({
        order: {
            [sortBy]: order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
          },
        relations:{classe:true},
      take: limit,
      skip: offset,
    });

    return {
      totalItems: total,
      items: etudiants,
      page,
      size
    };
  }

    async search(keyword: string): Promise<Etudiant[]> {

        return this.etudiantsRepostory.createQueryBuilder('etudiant')
            .where('etudiant.username LIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('etudiant.email LIKE :keyword', { keyword: `%${keyword}%` }).getMany()
    }

    async filterBYClass(keyword: string): Promise<Etudiant[]> {

        return this.etudiantsRepostory.createQueryBuilder('etudiant')
            .where('etudiant.classeId LIKE :keyword', { keyword: `%${keyword}%` }).getMany()
    }

    async staticEtudiants(keyword:string): Promise<({classe:any,number:any}|undefined)>{
      const classe = await this.classRepository.findOne({ where: { id: keyword } });
     
      
      return ({
        classe:  classe,
        number: await this.etudiantsRepostory.createQueryBuilder('etudiant')
        .where('etudiant.classeId LIKE :keyword', { keyword: `%${keyword}%` }).getCount() 

      })   }
}
