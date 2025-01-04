import { Module } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { EtudiantsController } from './etudiants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/typeOrm/entites/Class';
import { Etudiant } from 'src/typeOrm/entites/Etudiant';

@Module({
  imports:[TypeOrmModule.forFeature([Etudiant,Class])],
  providers: [EtudiantsService],
  controllers: [EtudiantsController],
  exports:[EtudiantsService]
})
export class EtudiantsModule {}
