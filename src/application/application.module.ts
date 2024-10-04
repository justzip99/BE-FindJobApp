import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationPost } from './entities/application-post.entity';
import { Application } from './entities/application.entity';
import { ApplicationsController } from './application.controller';
import { ApplicationsService } from './application.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { AuthGuard } from '../guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, ApplicationPost, User]),
    JwtModule.register({ signOptions: { expiresIn: '1d' } }),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, UsersService, AuthGuard],
})
export class ApplicationModule {}
