import { Body, Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ListProductsDto } from './dto/list-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  async listProducts(@Query() listProductsDto: ListProductsDto) {
    return this.productService.listProducts(listProductsDto);
  }
}
