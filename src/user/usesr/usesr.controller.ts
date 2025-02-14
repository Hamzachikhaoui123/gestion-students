import { BadRequestException, Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsesrService } from './usesr.service';
import { CreateUserDto } from '../dtos/CreatedUserDto';
import * as bcrypt from 'bcrypt'
import { AuthGuardGuard } from '../auth-guard/auth-guard.guard';
import { JwtService } from '@nestjs/jwt';
import {  HttpCode, Patch, Query, Req, Res } from '@nestjs/common/decorators';
import { Response } from 'express';

import { PaginatedResource } from 'src/utils/PaginatedResource';
import { User } from 'src/typeOrm/entites/User';
import { Pagination, PaginationParams } from 'src/params/Pagination';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
@Controller('user')

export class UsesrController {
    private client: ClientProxy;

constructor(private userService:UsesrService,private jwtService:JwtService,    private readonly notificationsGateway: NotificationsGateway
){
    this.client = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@rabbitmq'],
          queue: 'notifications_queue',
          queueOptions: {
            durable: false,
          },
        },
      });
}
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
        
         const newUser= this.userService.addUser(data);
           // Envoi d'une notification via RabbitMQ
    await this.client.emit('user_created', {
        userId: (await newUser).id,
        email: (await newUser).email,
      }).toPromise();
  
      // Envoi d'une notification en temps réel via WebSocket
      this.notificationsGateway.sendNotification({
        message: 'Nouvel utilisateur créé',
        user: {
          id: (await newUser).id,
          email: (await newUser).email,
        },
      });
  
      return newUser;
    }

    @Post('login')
    async login(@Body() data:{email:string,password:string},
    
    @Res({passthrough:true})reponse:Response
    )
    {
        
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

    @Patch('rest')
   async restPassword(@Body() data:{email:string,password:string,newPassword:string,confrimPassword:string},
    
   @Res({passthrough:true})reponse:Response
   )
        {
        
            const user=await this.userService.findByEmail(data.email);
            
            if(!user){
    
                throw new BadRequestException('user is not found')
                
            }
            if(!await bcrypt.compare(data.password,user.password)){
                
                throw new BadRequestException('Invalid redentilas')
            }

            if( data.newPassword !== data.confrimPassword){
                throw new BadRequestException('Invalid Password')

            }
            if (typeof data.newPassword !== 'string') {
                throw new Error('Password must be a string');
            }
            data.newPassword=await bcrypt.hash(data.newPassword,12);
            console.log('pass',data.newPassword);
            
            const newData=({email:data.email,password:data.newPassword})
            const newUser = await this.userService.updateUserPassword(user.id,newData)
            
            const jwt= await this.jwtService.signAsync({id:newUser.id})
            
            reponse.cookie('jwt',jwt,{httpOnly:true})
          
            return {
                message:'success',
                user:newUser,
                access_token:jwt
            };
        }


}
