import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [
    { id: '1', name: 'Product 1', price: 100 },
    { id: '2', name: 'Product 2', price: 200 },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    return this.products.find(product => product.id === id);
  }

  create(createProductDto: any) {
    const newProduct = {
      id: Date.now().toString(),
      ...createProductDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }
}