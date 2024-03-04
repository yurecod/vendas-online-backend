import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { CartService } from './cart.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { ReturnCartDTO } from './dtos/return-cart.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ){}
    @UsePipes(ValidationPipe)
    @Post()
    async creteCart(@Body() insertCart: InsertCartDTO, @UserId() userId: number): Promise<ReturnCartDTO> {
        return new ReturnCartDTO(await this.cartService.insertProductInCart(insertCart, userId),);
    }
}
