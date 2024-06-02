import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ListProductsDto } from './dto/list-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.addProduct(createProductDto);
  }

  @Get()
  async listProducts(@Query() listProductsDto: ListProductsDto) {
    return this.productService.listProducts(listProductsDto);
  }
}
