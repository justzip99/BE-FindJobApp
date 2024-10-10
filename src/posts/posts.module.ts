import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { ApplicationPost } from '../application/entities/application-post.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../guards/auth.guard';
import { Application } from '../application/entities/application.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, ApplicationPost]),
    JwtModule.register({ signOptions: { expiresIn: '1d' } }),
  ],
  controllers: [PostsController],
  providers: [PostsService, UsersService, AuthGuard],
})
export class PostsModule {}
