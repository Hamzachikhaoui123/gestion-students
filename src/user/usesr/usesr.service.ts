import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeOrm/entites/User';
import { userParams } from 'src/utils/util';
import { Repository } from 'typeorm';
import { PageDto } from '../dtos/pagination.Dto';
import { PageMetaDto } from '../dtos/page-meta.dto';
import { UserDto } from '../dtos/UserDto';
import { PageOptionsDto } from '../dtos/PageOptionsDto';
import { PaginatedResource } from 'src/utils/PaginatedResource';
import { Pagination } from 'src/params/Pagination';

@Injectable()
export class UsesrService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){

    }
  getUser() {
        return  this.userRepository.find()
    }
    // async findAll(paginationDto: PaginationDto): Promise<{ data: User[], total: number }> {
    //     const { page, limit } = paginationDto;
    //     const [data, total] = await this.userRepository.findAndCount({
    //       skip: (page - 1) * limit,
    //       take: limit,
    //     });
    
    //     return {
    //       data,
    //       total,
    //     };
    //   }


    public async getUsers(
        pageOptionsDto: PageOptionsDto,
      ): Promise<PageDto<any>> {
        console.log("pageOptionsDto.skip",pageOptionsDto.skip)
        
        const queryBuilder = this.userRepository.createQueryBuilder("user");
    
        queryBuilder
          .orderBy("user.createdAt", pageOptionsDto.order)
          .skip(pageOptionsDto?.skip)
          .take(pageOptionsDto.take);
    
        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();
    
        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    
        return new PageDto(entities, pageMetaDto);
      }

      public async getCities(
        { page, limit, size, offset }: Pagination,
    
    ): Promise<PaginatedResource<Partial<User>>> {
      

        const [languages, total] = await this.userRepository.findAndCount({
          
            take: limit,
            skip: offset,
        });

        return {
            totalItems: total,
            items: languages,
            page,
            size
        };
    }

    async addUser(userParams:userParams ):Promise<User>{
        const addUser= this.userRepository.create({...userParams,createdAt:new Date()})
        return this.userRepository.save(addUser)
    }
    async findByEmail(email: any): Promise<User | undefined> {
        console.log(email);
        const user=this.userRepository.findOneBy({email})
        user.then((value)=>{console.log(value);}
        )
        return user}
}
