import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsesrService } from './usesr.service';
import { CreateUserDto } from '../dtos/CreatedUserDto';
import * as bcrypt from 'bcrypt'
import { AuthGuardGuard } from '../auth-guard/auth-guard.guard';
import { JwtService } from '@nestjs/jwt';
import {  Req, Res } from '@nestjs/common/decorators';
import { Response ,Request, response} from 'express';
@Controller('user')
export class UsesrController {
constructor(private userService:UsesrService,private jwtService:JwtService){}
    @UseGuards(AuthGuardGuard)
    @Get('all')
    findAllUser(){
        return this.userService.getUser()
    }

    @Post('add')
   async addUser(@Body() createUserDto:CreateUserDto){

        createUserDto.password=await bcrypt.hash(createUserDto.password,12)
        return await this.userService.addUser(createUserDto)
    }

    @Post('login')
    async login(@Body() createUserdto:CreateUserDto,
    
    @Res({passthrough:true})reponse:Response
    ){
        console.log("email",createUserdto.email);
        
        const user=await this.userService.findByEmail(createUserdto.email);
        
        if(!user){

            throw new BadRequestException('user is not found')
            
        }
        if(!await bcrypt.compare(createUserdto.password,user.password)){
            
            throw new BadRequestException('Invalid redentilas')
        }
        
        const jwt= await this.jwtService.signAsync({id:user.id})
        
        reponse.cookie('jwt',jwt,{httpOnly:true})
        return {
            message:'success'
        };
    }


}
