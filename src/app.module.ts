import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeOrm/entites/User';
import { ConfigModule } from '@nestjs/config';
import { ClasseModule } from './classe/classe.module';
import { EtudiantsModule } from './etudiants/etudiants.module';
import { Class } from './typeOrm/entites/Class';
import { CalendrierModule } from './calendrier/calendrier.module';
import { CacheModule } from '@nestjs/cache-manager';
import { Etudiant } from './typeOrm/entites/Etudiant';

@Module({
  imports: [
    CacheModule.register({
      isGlobal:true,
      ttl:30*1000
    }),
    TypeOrmModule.forRoot({
    type:'mysql',
    host: (process.env.MYSQL_HOST as string) ,  // Indique explicitement que MYSQL_HOST est une chaîne
    port:3306,
    username:'root',
    password:'',
    database:'stundents',
    entities:[User,Etudiant,Class],
    synchronize: false, // false pour utiliser les migrations
  }),
  ConfigModule.forRoot({isGlobal:true}),
   UserModule,
   ClasseModule,EtudiantsModule, CalendrierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
