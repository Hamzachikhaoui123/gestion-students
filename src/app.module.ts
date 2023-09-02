import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeOrm/entites/User';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'',
    database:'stundents',
    entities:[User],
    synchronize:true
  }),
  ConfigModule.forRoot({isGlobal:true}),
   UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
