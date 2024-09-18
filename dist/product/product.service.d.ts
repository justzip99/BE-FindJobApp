import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductInfoDto } from './productinfo.dto';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    addProduct(productInfo: ProductInfoDto): Promise<Product>;
    updateProduct(id: number, updateProductDetails: ProductInfoDto): Promise<import("typeorm").UpdateResult>;
    findProducts(): Promise<Product[]>;
    findOneProduct(id: number): Promise<Product>;
    deleteProduct(id: number): Promise<import("typeorm").DeleteResult>;
}
