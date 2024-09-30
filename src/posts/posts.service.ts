import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CurrentUser } from '../users/custome_decorator/currentUser.decorator';
import { User } from '../users/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepostiory: Repository<Post>,
  ) {}
  createPost(createPostDto: CreatePostDto, currentUser: User) {
    const newPost = this.postRepostiory.create({ ...createPostDto, datePost: new Date });
    newPost.user = currentUser;
    return this.postRepostiory.save(newPost);
  }

  findAll() {
    return this.postRepostiory.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
