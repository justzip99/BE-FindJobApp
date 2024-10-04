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
      expDatePost: savedPost.expDatePost,
      description: savedPost.description,
      salary: savedPost.salary,
      userId: savedPost.user.id,
    };
  }

  findAllPost() {
    return this.postRepository.find({ relations: ['user'] });
  }

  async findCurrentUserPosts(userId: number) {
    return this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  findPostById(id: number) {
    return this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    let post = await this.findPostById(id);

    if (!post) {
      throw new NotFoundException(`Not found post with the provided id ${id}`);
    }

    const mergeLocation = (current: any, updates: any) => ({
      address: updates.address || current.address,
      province: updates.province || current.province,
      district: updates.district || current.district,
      lat: updates.lat !== undefined ? updates.lat : current.lat,
      lng: updates.lng !== undefined ? updates.lng : current.lng,
    });

    const updatedPost = {
      ...post,
      ...updatePostDto,
      location: updatePostDto.location
        ? mergeLocation(post.location, updatePostDto.location)
        : post.location,
    };

    return this.postRepository.save(updatedPost);
  }

  async renewDatePost(id: number): Promise<Post> {
    let post = await this.findPostById(id);

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    post.datePost = new Date();

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
