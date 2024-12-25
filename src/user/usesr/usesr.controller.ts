import { BadRequestException, Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsesrService } from './usesr.service';
import { CreateUserDto } from '../dtos/CreatedUserDto';
import * as bcrypt from 'bcrypt'
import { AuthGuardGuard } from '../auth-guard/auth-guard.guard';
import { JwtService } from '@nestjs/jwt';
import {  HttpCode, Query, Req, Res } from '@nestjs/common/decorators';
import { Response } from 'express';

import { PaginatedResource } from 'src/utils/PaginatedResource';
import { User } from 'src/typeOrm/entites/User';
import { Pagination, PaginationParams } from 'src/params/Pagination';
@Controller('user')
export class UsesrController {
constructor(private userService:UsesrService,private jwtService:JwtService){}
    @Get('all')
    findAllUser(){
        return this.userService.getUser()
    }


    @Get()
    @HttpCode(HttpStatus.OK)
    public async getUsers(
        @PaginationParams() paginationParams: Pagination,
    ): Promise<PaginatedResource<Partial<User>>> {
        return await this.userService.getUsers(paginationParams);
    }

    @Post('add')
   async addUser(@Body() data: { password:string, userName: string; email?: string,createdAt?: Date }){
    if (typeof data.password !== 'string') {
        throw new Error('Password must be a string');
    }
        data.password=await bcrypt.hash(data.password,12);
        
        return await this.userService.addUser(data)
    }

    @Post('login')
    async login(@Body() data:{email:string,password:string},
    
    @Res({passthrough:true})reponse:Response
    ){
        
        const user=await this.userService.findByEmail(data.email);
        
        if(!user){

            throw new BadRequestException('user is not found')
            
        }
        if(!await bcrypt.compare(data.password,user.password)){
            
            throw new BadRequestException('Invalid redentilas')
        }
        
        const jwt= await this.jwtService.signAsync({id:user.id})
        
        reponse.cookie('jwt',jwt,{httpOnly:true})
      
        return {
            message:'success',
            user:user,
            access_token:jwt
        };
    }


}
