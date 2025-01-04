import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeOrm/entites/User';
import { userParams } from 'src/utils/util';
import { Repository } from 'typeorm';

import { PaginatedResource } from 'src/utils/PaginatedResource';
import { Pagination } from 'src/params/Pagination';

@Injectable()
export class UsesrService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {

  }
  getUser() {
    return this.userRepository.find()
  }
  public async getUsers(
    { page, limit, size, offset,sortBy,order }: Pagination,

  ): Promise<PaginatedResource<Partial<User>>> {
    limit = size || 10; // Par défaut, taille de la page 10 si `size` n'est pas défini
    offset = (page - 1) * offset; // Calcul de l'index de départ
        const validSortFields=['id','username','createAt'];
        if(!validSortFields.includes(sortBy)){
          throw new Error(`Invalid sort field : ${sortBy}`)
        }
    const [users, total] = await this.userRepository.findAndCount({
      order:{
        [sortBy]:order.toUpperCase() ==="ASC"?'ASC':'DESC'
      },
      take: limit,
      skip: offset,
    });

    return {
      totalItems: total,
      items: users,
      page,
      size
    };
  }

  async addUser(data: { password:any, userName: string; email?: string,createdAt?: Date }): Promise<User> {

    const addUser = this.userRepository.create({ username: data.userName, email: data.email, password: data.password, createdAt: new Date() })

    return this.userRepository.save(addUser)
  }

    async  updateUserPassword(id, data:{email:string,password:string}){
      const updateResult = await this.userRepository.update(id, data);
  
      if (updateResult.affected === 1) {
        // Récupérer l'objet mis à jour
        return await this.userRepository.findOne({ where: { id }});
      } else {
        throw new NotFoundException(`Etudiant avec l'ID ${id} non trouvé.`);
      }
      }
  async findByEmail(email: any): Promise<User | undefined> {
    const user = this.userRepository.findOneBy({ email })
    return user
  }
}
