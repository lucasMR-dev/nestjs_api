import { Category } from "src/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    logo: string;

    @ManyToMany(type => Category)
    @JoinColumn({ name: 'category_product' })
    category: Category
}
