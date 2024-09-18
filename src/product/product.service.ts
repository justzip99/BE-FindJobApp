import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductInfoDto } from './productinfo.dto';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

    addProduct(productInfo: ProductInfoDto):Promise<Product> {
        const newProduct = this.productRepository.create({... productInfo});
        return this.productRepository.save(newProduct);
        }
        
        updateProduct(id: number, updateProductDetails: ProductInfoDto) {
        return this.productRepository.update({id}, {...updateProductDetails})
        }
        
        async findProducts(): Promise<Product[]> {
        return this.productRepository.find();
        }
        
        async findOneProduct(id: number): Promise<Product> {
        return this.productRepository.findOne({where: {id}});
        }
        
        deleteProduct(id: number) {
        return this.productRepository.delete({id});
        }
        
        
}
