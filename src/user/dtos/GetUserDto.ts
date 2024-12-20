import { IsOptional, IsIn, IsString } from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';
}
