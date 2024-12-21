import { Module } from '@nestjs/common';
import { ClasseController } from './classe/classe.controller';
import { ClasseService } from './classe/classe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/typeOrm/entites/Class';
import { EtudiantsModule } from '../etudiants/etudiants.module';

@Module({
  imports:[TypeOrmModule.forFeature([Class]), EtudiantsModule],
  controllers: [ClasseController],
  providers: [ClasseService],
})
export class ClasseModule {}
