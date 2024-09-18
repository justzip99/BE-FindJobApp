import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ProductInfoDto } from './productinfo.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private productMangaging: ProductService) {}

    @Post('add')
    addProduct(@Body() product: ProductInfoDto) {
        return this.productMangaging.addProduct(product);

}

    @Get('all')
    findAllProducts() {
        return this.productMangaging.findProducts();
}

    @Get(':id')
    findOneProduct(@Query('id')id : number) {
        return this.productMangaging.findOneProduct(id);
}

    @Put(':id')
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProduct: ProductInfoDto){
        return this.productMangaging.updateProduct(id, updateProduct)
}

    @Delete(':id')
     deleteProduct(@Param('id') id: number) {
        try {
           return this.productMangaging.deleteProduct(id)
        } catch (err) {
            throw new NotFoundException("Product not found");
    }
}

}
