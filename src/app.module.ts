import { Module, Options } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { Order } from './orders/orders.entity';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UsersModule,ProductModule,
    TypeOrmModule.forRoot( {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'hieudm1',
      password: 'Iamatwork',
      database: 'nestjs_app',
      entities: [User, Product, Order],
      synchronize: true,
    }),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
