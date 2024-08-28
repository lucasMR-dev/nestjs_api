import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Public } from 'src/auth/constants';

@Controller('brand')
@UsePipes(new ValidationPipe())
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  // Rutas Publicas
  @Public()
  @Get()
  findAll() {
    return this.brandService.findAllBrands();
  }

  // Rutas Privadas
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findBrand(+id);
  }

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.createBrand(createBrandDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.updateBrand(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.removeBrand(+id);
  }
}
