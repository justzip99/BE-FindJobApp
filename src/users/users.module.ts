import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { dataSourceOptions } from '../config/data_source.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], dataSourceOptions),
    JwtModule.register({ global: true, signOptions: { expiresIn: '1d' } }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
