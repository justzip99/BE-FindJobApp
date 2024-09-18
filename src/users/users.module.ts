import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import { Order } from 'src/orders/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order]),
  JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' }}),],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
