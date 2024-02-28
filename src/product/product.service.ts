import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateProductDTO } from './dtos/create-product.dto';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,

        private readonly categoryService: CategoryService,
    ) {}

    async findAll(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find();

        if (!products || products.length === 0){
            throw new NotFoundException('Not found products');
        }

        return products;
    }

    async createProduct(createProduct: CreateProductDTO): Promise<ProductEntity>{
        await this.categoryService.findCategoryById(createProduct.categoryId);

        return this.productRepository.save({
            ...createProduct,
        });
    }
}
