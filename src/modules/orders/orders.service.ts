import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  private orders = [
    { id: '1', userId: '1', products: ['1', '2'], totalAmount: 300 },
    { id: '2', userId: '2', products: ['1'], totalAmount: 100 },
  ];

  findAll() {
    return this.orders;
  }

  findOne(id: string) {
    return this.orders.find(order => order.id === id);
  }

  create(createOrderDto: any) {
    const newOrder = {
      id: Date.now().toString(),
      ...createOrderDto,
    };
    this.orders.push(newOrder);
    return newOrder;
  }
}