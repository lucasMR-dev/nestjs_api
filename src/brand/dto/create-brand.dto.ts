import {
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class CreateBrandDto {

    @IsString()
    @MinLength(3, {message: 'Name must be at least 2 characters.'})
    @IsNotEmpty()
    name: string;

    @IsString()
    logo: string;

    @IsNotEmpty()
    category: Category;
}
