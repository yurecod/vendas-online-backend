import { CartProductEntity } from "src/cart-product/entities/cart-product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'cart'})
export class CartEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'user_id', nullable: false })
    userId: number;

    @CreateDateColumn({name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at' })
    updateAt: Date;

    @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.cart)
    cartProduct?: CartProductEntity[];
}