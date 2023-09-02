import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeOrm/entites/User';
import { userParams } from 'src/utils/util';
import { Repository } from 'typeorm';

@Injectable()
export class UsesrService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){

    }
  getUser() {
        return  this.userRepository.find()
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
