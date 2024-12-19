import { Body, Injectable } from '@nestjs/common';
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
    { page, limit, size, offset }: Pagination,

  ): Promise<PaginatedResource<Partial<User>>> {
    limit = size || 10; // Par défaut, taille de la page 10 si `size` n'est pas défini
    offset = (page - 1) * offset; // Calcul de l'index de départ

    const [users, total] = await this.userRepository.findAndCount({

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

  async addUser(userParams: userParams): Promise<User> {

    const addUser = this.userRepository.create({ username: userParams.userName, email: userParams.email, password: userParams.password, createdAt: new Date() })

    return this.userRepository.save(addUser)
  }
  async findByEmail(email: any): Promise<User | undefined> {
    const user = this.userRepository.findOneBy({ email })
    return user
  }
}
