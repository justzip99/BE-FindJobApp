import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepostiory: Repository<Post>,
  ) {}
  createPost(createPostDto: CreatePostDto, currentUser: User) {
    const newPost = this.postRepostiory.create({
      ...createPostDto,
      datePost: new Date(),
    });
    newPost.user = currentUser;
    return this.postRepostiory.save(newPost);
  }

  findAll() {
    return this.postRepostiory.find();
  }

  findPostById(id: number) {
    return this.postRepostiory.findOne({ where: { id } });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    let post = await this.findPostById(id);

    if (!post) {
      throw new NotFoundException(`Not found post with the provided id ${id}`);
    }

    post = { ...post, ...updatePostDto };

    return this.postRepostiory.save(post);
  }

  async delete(id: number) {
    try {
      const post = await this.findPostById(id);

      if (!post) {
        throw new NotFoundException(
          `Not found post with the provided id ${id}`,
        );
      }

      await this.postRepostiory.remove(post);
      return 'Post deleted succesfully';
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete post');
    }
  }
}
