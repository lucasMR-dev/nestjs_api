import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MinLength,
} from 'class-validator';
import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3, {message: "Name must be at least 3 characters."})
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    brand: Brand

    @IsNotEmpty()
    category: Category

    @IsNumber()
    price: number;

    @IsNumber()
    stock: number;

    @IsString()
    images: string[];

}
