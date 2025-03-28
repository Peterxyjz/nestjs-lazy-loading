# Lazy-Loading NestJS Application for Vercel

Dự án này là một ứng dụng NestJS sử dụng kỹ thuật lazy-loading để chỉ khởi động các module khi chúng được yêu cầu, giúp tối ưu hóa hiệu suất khi triển khai lên Vercel.

## Cấu trúc dự án

```
src/
├── modules/
│   ├── users/         # Module quản lý người dùng
│   ├── products/      # Module quản lý sản phẩm
│   └── orders/        # Module quản lý đơn hàng
├── app.module.ts      # Module chính với cấu hình lazy-loading
├── app.controller.ts
├── app.service.ts
└── main.ts
```

## Tính năng

- **Lazy-loading Modules**: Chỉ khởi động các module khi chúng được yêu cầu
- **Tối ưu hoá cho Vercel**: Cấu hình sẵn sàng để deploy lên Vercel
- **Kiến trúc module hoá**: Chia nhỏ ứng dụng thành các module độc lập

## Cách sử dụng

1. Cài đặt các gói phụ thuộc:
```bash
npm install
```

2. Chạy ứng dụng:
```bash
npm run start:dev
```

3. Truy cập các endpoint:
   - `/users`: Chỉ khởi động module Users
   - `/users/1`: Lấy thông tin người dùng với ID=1
   - `/products`: Chỉ khởi động module Products
   - `/products/1`: Lấy thông tin sản phẩm với ID=1
   - `/orders`: Chỉ khởi động module Orders
   - `/orders/1`: Lấy thông tin đơn hàng với ID=1

4. Build ứng dụng để deploy:
```bash
npm run build
```

5. Deploy lên Vercel:
```bash
vercel --prod
```

## Làm thế nào nó hoạt động?

NestJS cung cấp khả năng lazy-loading module thông qua `LazyModuleLoader` từ `@nestjs/core`. Trong ứng dụng này, chúng ta sử dụng `LazyModuleLoader` trong controller để tải các module theo yêu cầu:

```typescript
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly lazyModuleLoader: LazyModuleLoader,
  ) {}

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
}
```

Khi một request đi đến `/users`, module `UsersModule` sẽ được động (lazy-load) và khởi tạo. Các module khác sẽ không được khởi tạo cho đến khi chúng được yêu cầu.

## Chạy trong môi trường phát triển

Các module chỉ được khởi động khi chúng được yêu cầu, bạn có thể kiểm tra điều này bằng cách xem log khi truy cập các endpoint khác nhau.

## Lưu ý khi Deploy lên Vercel

Vercel là một nền tảng dựa trên Serverless Functions, vì vậy lazy-loading đặc biệt hữu ích ở đây để giảm kích thước của mỗi function và tăng tốc thời gian khởi động.

Tệp `vercel.json` đã được cấu hình để định tuyến mọi request tới `dist/main.js`.