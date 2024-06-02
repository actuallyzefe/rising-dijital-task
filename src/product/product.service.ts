import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ListProductsDto } from './dto/list-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findOne(options: Partial<Product>) {
    return this.productRepository.findOne({
      where: options,
    });
  }

  async addProduct(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async listProducts(listProductsDto: ListProductsDto) {
    const { page = 1, limit = 10 } = listProductsDto;

    const [results, total] = await this.productRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      results,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async decreaseStock(productId: number, quantity: number) {
    const product = await this.findOne({ id: productId });

    if (product.stock < quantity) {
      throw new BadRequestException('Insufficient product stock');
    }

    product.stock -= quantity;
    return this.productRepository.save(product);
  }
}
