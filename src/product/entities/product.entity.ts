import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30})
    name: string;

    @Column({ type: 'jsonb', default: {}})
    description: string;

    @Column({ type: 'decimal' })
    price: number;

    @Column('text', {array: true})
    images: string[];

    @ManyToOne(type => Category)
    @JoinColumn({ name: 'product_category'})
    category: Category

    @ManyToOne(type => Brand)
    @JoinColumn({name: 'product_brand'})
    brand: Brand

    @Column({ type: 'int' })
    stock: number;


}
