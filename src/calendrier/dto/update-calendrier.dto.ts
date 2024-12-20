import { PartialType } from '@nestjs/mapped-types';
import { CreateCalendrierDto } from './create-calendrier.dto';

export class UpdateCalendrierDto extends PartialType(CreateCalendrierDto) {}
