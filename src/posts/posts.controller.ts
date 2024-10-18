import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Put,
  Request,
  Patch,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from '../users/custome_decorator/currentUser.decorator';
import { User } from '../users/users.entity';
import { AuthGuard } from '../guards/auth.guard';
import { Header } from '@nestjs/common';
@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create-post')
  @UseGuards(AuthGuard)
  create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.postsService.createPost(createPostDto, currentUser);
  }

  @Get('all-posts')
  @UseGuards(AuthGuard)
  @Header('Content-Type', 'application/json')
  async getAllPosts(@CurrentUser() currentUser: User) {
    const posts = await this.postsService.findAllPostsExceptCurrentUser(
      currentUser.id,
    );
    return {
      data: posts.map((post) => ({
        id: post.id,
        job_position: post.job_position,
        jobType: post.jobType,
        requirements: post.requirements,
        qualification: post.qualification,
        experience: post.experience,
        specialization: post.specialization,
        description: post.description,
        salary: post.salary,
        location: post.location,
        datePost: post.datePost,
        expDatePost: post.expDatePost,
        userId: post.user.id,
        appliedUserIds: post.applicationPosts.map(
          (applicationPost) => applicationPost.application.userId,
        ),
      })),
    };
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  @Header('Content-Type', 'application/json')
  async getCurrentUserPosts(@Request() request) {
    const userId = request.currentUser.id;
    const posts = await this.postsService.findCurrentUserPosts(userId);
    return {
      data: posts.map((post) => ({
        id: post.id,
        job_position: post.job_position,
        jobType: post.jobType,
        requirements: post.requirements,
        qualification: post.qualification,
        experience: post.experience,
        specialization: post.specialization,
        description: post.description,
        salary: post.salary,
        location: post.location,
        datePost: post.datePost,
        expDatePost: post.expDatePost,
        userId: post.user.id,
        appliedUserIds: post.applicationPosts.map(
          (applicationPost) => applicationPost.application.userId,
        ),
      })),
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.postsService.findPostById(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(+id, updatePostDto);
  }

  @Patch('renew-Date/:id')
  @UseGuards(AuthGuard)
  async renewPost(@Param('id') id: number, @CurrentUser() currentUser: User) {
    const renewedPost = await this.postsService.renewDatePost(id, currentUser);

    return {
      data: {
        id: renewedPost.id,
        job_position: renewedPost.job_position,
        requirements: renewedPost.requirements,
        qualification: renewedPost.qualification,
        experience: renewedPost.experience,
        jobType: renewedPost.jobType,
        specialization: renewedPost.specialization,
        description: renewedPost.description,
        salary: renewedPost.salary,
        location: renewedPost.location,
        userId: renewedPost.user.id,
        datePost: renewedPost.datePost,
        expDatePost: renewedPost.expDatePost,
      },
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.delete(+id);
  }
}
