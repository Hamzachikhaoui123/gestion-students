import { Module } from '@nestjs/common';
import { CalendrierService } from './calendrier.service';
import { CalendrierController } from './calendrier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendrier } from './entities/calendrier.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Calendrier])],
  controllers: [CalendrierController],
  providers: [CalendrierService]
})
export class CalendrierModule {}
