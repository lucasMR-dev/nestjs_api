import {
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateCategoryDto {

    @IsString()
    @MinLength(3, { message: 'Name must be alteast 3 characters.' })
    @IsNotEmpty()
    name: string;
}
