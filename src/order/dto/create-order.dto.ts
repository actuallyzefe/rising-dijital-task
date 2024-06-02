import { IsNumber, IsString, Max, Min, max } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  quantity: number;
}
