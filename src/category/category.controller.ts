import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/auth/constants';

@Controller('category')
@UsePipes(new ValidationPipe())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  // Rutas Publicas
  @Public()
  @Get()
  findAll() {
    return this.categoryService.findAllCategories();
  }

  // Rutas Privadas
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findCategory(+id);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.removeCategory(+id);
  }
}
