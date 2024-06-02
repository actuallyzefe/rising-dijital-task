import { Transform } from 'class-transformer';
import { IsOptional, IsInt, Min } from 'class-validator';

export class ListProductsDto {
  @IsInt()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit?: number;
}
