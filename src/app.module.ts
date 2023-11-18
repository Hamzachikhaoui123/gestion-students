import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeOrm/entites/User';
import { ConfigModule } from '@nestjs/config';
import { ClasseModule } from './classe/classe.module';
import { EtudiantsModule } from './etudiants/etudiants.module';
import { Etuidant } from './typeOrm/entites/Etuidant';
import { Class } from './typeOrm/entites/Class';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'',
    database:'stundents',
    entities:[User,Etuidant,Class],
    synchronize:true
  }),
  ConfigModule.forRoot({isGlobal:true}),
   UserModule,
   ClasseModule,EtudiantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
