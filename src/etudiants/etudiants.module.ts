import { Module } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { EtudiantsController } from './etudiants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etuidant } from 'src/typeOrm/entites/Etuidant';
import { Class } from 'src/typeOrm/entites/Class';

@Module({
  imports:[TypeOrmModule.forFeature([Etuidant,Class])],
  providers: [EtudiantsService],
  controllers: [EtudiantsController],
  exports:[EtudiantsService]
})
export class EtudiantsModule {}
