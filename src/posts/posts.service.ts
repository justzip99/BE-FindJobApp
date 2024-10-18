import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, Connection } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private connection: Connection,
  ) {}
  async createPost(createPostDto: CreatePostDto, currentUser: User) {
    const postCost = 500000;

    if (currentUser.balance < postCost) {
      throw new BadRequestException('Insufficient balance to create a post');
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      currentUser.balance -= postCost;
      await queryRunner.manager.save(currentUser);

      const newPost = this.postRepository.create({
        ...createPostDto,
        datePost: new Date(),
        user: currentUser,
      });

      const savedPost = await queryRunner.manager.save(newPost);

      await queryRunner.commitTransaction();

      return {
        id: savedPost.id,
        job_position: savedPost.job_position,
        jobType: savedPost.jobType,
        requirements: savedPost.requirements,
        qualification: savedPost.qualification,
        experience: savedPost.experience,
        specialization: savedPost.specialization,
        description: savedPost.description,
        salary: savedPost.salary,
        location: savedPost.location,
        social: savedPost.social,
        userId: savedPost.user.id,
        datePost: savedPost.datePost,
        expDatePost: savedPost.expDatePost,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to create post');
    } finally {
      await queryRunner.release();
    }
  }

  async findAllPostsExceptCurrentUser(currentUserId: number) {
    return this.postRepository.find({
      where: { user: { id: Not(currentUserId) } },
      relations: ['user', 'applicationPosts', 'applicationPosts.application'],
    });
  }

  async findCurrentUserPosts(userId: number) {
    return this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'applicationPosts', 'applicationPosts.application'],
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

  async renewDatePost(id: number, currentUser: User): Promise<Post> {
    const postCost = 500000;

    if (currentUser.balance < postCost) {
      throw new BadRequestException('Insufficient balance to renew the post');
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let post = await this.findPostById(id);

      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }

      currentUser.balance -= postCost;
      await queryRunner.manager.save(currentUser);

      post.datePost = new Date();
      const renewedPost = await queryRunner.manager.save(post);

      await queryRunner.commitTransaction();

      return renewedPost;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to renew post');
    } finally {
      await queryRunner.release();
    }
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
