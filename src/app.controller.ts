import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly lazyModuleLoader: LazyModuleLoader,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users/:id?')
  async getUsers(@Param('id') id?: string) {
    // Lazy load UsersModule khi endpoint này được gọi
    const { UsersModule } = await import('./modules/users/users.module');
    const moduleRef = await this.lazyModuleLoader.load(() => UsersModule);
    const usersService = moduleRef.get(
      (await import('./modules/users/users.service')).UsersService
    );
    
    return id ? usersService.findOne(id) : usersService.findAll();
  }

  @Post('users')
  async createUser(@Body() createUserDto: any) {
    const { UsersModule } = await import('./modules/users/users.module');
    const moduleRef = await this.lazyModuleLoader.load(() => UsersModule);
    const usersService = moduleRef.get(
      (await import('./modules/users/users.service')).UsersService
    );
    
    return usersService.create(createUserDto);
  }

  @Get('products/:id?')
  async getProducts(@Param('id') id?: string) {
    // Lazy load ProductsModule khi endpoint này được gọi
    const { ProductsModule } = await import('./modules/products/products.module');
    const moduleRef = await this.lazyModuleLoader.load(() => ProductsModule);
    const productsService = moduleRef.get(
      (await import('./modules/products/products.service')).ProductsService
    );
    
    return id ? productsService.findOne(id) : productsService.findAll();
  }

  @Post('products')
  async createProduct(@Body() createProductDto: any) {
    const { ProductsModule } = await import('./modules/products/products.module');
    const moduleRef = await this.lazyModuleLoader.load(() => ProductsModule);
    const productsService = moduleRef.get(
      (await import('./modules/products/products.service')).ProductsService
    );
    
    return productsService.create(createProductDto);
  }

  @Get('orders/:id?')
  async getOrders(@Param('id') id?: string) {
    // Lazy load OrdersModule khi endpoint này được gọi
    const { OrdersModule } = await import('./modules/orders/orders.module');
    const moduleRef = await this.lazyModuleLoader.load(() => OrdersModule);
    const ordersService = moduleRef.get(
      (await import('./modules/orders/orders.service')).OrdersService
    );
    
    return id ? ordersService.findOne(id) : ordersService.findAll();
  }
  
  @Post('orders')
  async createOrder(@Body() createOrderDto: any) {
    const { OrdersModule } = await import('./modules/orders/orders.module');
    const moduleRef = await this.lazyModuleLoader.load(() => OrdersModule);
    const ordersService = moduleRef.get(
      (await import('./modules/orders/orders.service')).OrdersService
    );
    
    return ordersService.create(createOrderDto);
  }
}