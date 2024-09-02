import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Public } from 'src/auth/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require("path");

/**
 * Multer Upload Storage Config
 */
export const storage = {
  storage: diskStorage({
    destination: './Public/uploads',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '');
      const extenseion: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extenseion}`);
    }
  })
}

@Controller('brand')
//@UsePipes(new ValidationPipe())
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
  @UseInterceptors(FileInterceptor('logo', storage))
  create(@UploadedFile() file, @Body() createBrandDto: CreateBrandDto) {
    // Pass logo filename after upload
    createBrandDto.logo = file.filename;
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
