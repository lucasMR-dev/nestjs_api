import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {

  constructor(
    @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>,
  ) { }

  async findAllBrands(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  async findBrand(id: number): Promise<Brand> {
    return this.brandRepository.findOneBy({ id });
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand: Brand = new Brand();
    brand.name = createBrandDto.name;
    brand.logo = createBrandDto.logo;
    brand.category = createBrandDto.category;
    return this.brandRepository.save(brand);
  }

  async updateBrand(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand: Brand = new Brand();
    brand.name = updateBrandDto.name;
    brand.logo = updateBrandDto.logo;
    brand.category = updateBrandDto.category;
    brand.id = id;
    return this.brandRepository.save(brand);
  }

  async removeBrand(id: number): Promise <{ affected?: number}> {
    return this.brandRepository.delete(id);
  }
}
