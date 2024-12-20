import { IsOptional, IsIn, IsNumber, IsString } from 'class-validator';

export class PaginationParamsDto {
  @IsNumber()
  page: number;

  @IsNumber()
  size: number;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';
}
