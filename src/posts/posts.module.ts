import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { ApplicationPost } from '../application/entities/application-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, ApplicationPost])],
  controllers: [PostsController],
  providers: [PostsService, UsersService],
})
export class PostsModule {}
