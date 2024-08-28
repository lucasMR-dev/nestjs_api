import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ){}

  /**
   * Muestra todos los productos
   * @returns HttpCode 200
   */
  findAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  /**
   * Busqueda del producto segun identificador unico
   * @param id 
   * @returns HttpCode 200
   */
  findProduct(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  /**
   * Crea un producto
   * @param createProductDto 
   * @returns HttpCode 201
   */
  createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product: Product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.stock = createProductDto.stock;
    product.price = createProductDto.price;
    product.images = createProductDto.images;
    return this.productRepository.save(product);
  }

  /**
   * Actualiza el producto segun identificador unico
   * @param id 
   * @param updateProductDto 
   * @returns HttpCode 200
   */
  updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product: Product = new Product();
    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.stock = updateProductDto.stock;
    product.price = updateProductDto.price;
    product.images = updateProductDto.images;
    product.id = id;
    return this.productRepository.save(product);
  }

  /**
   * Borra el producto segun identificador unico
   * @param id 
   * @returns HttpCode 200
   */
  removeProduct(id: number): Promise<{ affected?: number }> {
    return this.productRepository.delete(id);
  }
}
