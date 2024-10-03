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
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  async createPost(createPostDto: CreatePostDto, currentUser: User) {
    const newPost = this.postRepository.create({
      ...createPostDto,
      datePost: new Date(),
      user: currentUser,
    });

    const savedPost = await this.postRepository.save(newPost);

    return {
      id: savedPost.id,
      job_position: savedPost.job_position,
      location: savedPost.location,
      datePost: savedPost.datePost,
      description: savedPost.description,
      salary: savedPost.salary,
      userId: savedPost.user.id,
    };
  }

  findAll() {
    return this.postRepository.find({ relations: ['user'] });
  }

  findPostById(id: number) {
    return this.postRepository.findOne({ where: { id } });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    let post = await this.findPostById(id);

    if (!post) {
      throw new NotFoundException(`Not found post with the provided id ${id}`);
    }

    post = { ...post, ...updatePostDto };

    return this.postRepository.save(post);
  }

  async delete(id: number) {
    try {
      const post = await this.findPostById(id);

      if (!post) {
        throw new NotFoundException(
          `Not found post with the provided id ${id}`,
        );
      }

      await this.postRepository.remove(post);
      return 'Post deleted succesfully';
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete post');
    }
  }
}
