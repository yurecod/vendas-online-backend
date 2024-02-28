import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProduct } from './dtos/return-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDTO } from './dtos/create-product.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
    constructor(
        private readonly produtcService: ProductService
    ){}

    @Get()
    async findAll(): Promise<ReturnProduct[]>{
        return (await this.produtcService.findAll()).map((product) => new ReturnProduct(product),
        );
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(@Body() createProduct: CreateProductDTO): Promise<ProductEntity>{
        return this.produtcService.createProduct(createProduct);
    }
}
