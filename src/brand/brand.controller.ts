import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Public } from 'src/auth/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require("path");
import { v4 as uuidv4 } from 'uuid';

/**
 * Multer Upload Config
 */
export const multerConfig = {
  limits: {
    fileSize: 12000000,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(new HttpException(`Unsupported file type ${path.extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    }
  },
  storage: diskStorage({
    destination: './Public/uploads',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
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
  @UseInterceptors(FileInterceptor('logo', multerConfig))
  create(@UploadedFile() file, @Body() createBrandDto: CreateBrandDto) {
    //Check if a file is uploaded
    if (file) {
      // Pass logo filename after upload
      createBrandDto.logo = file.filename;
      return this.brandService.createBrand(createBrandDto);
    }
    else {
      throw new HttpException('Not file detected', HttpStatus.BAD_REQUEST)
    }
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
