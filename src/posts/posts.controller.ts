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
  @Header('Content-Type', 'application/json')
  async getAllPosts() {
    const posts = await this.postsService.findAllPost();
    return {
      data: posts.map((post) => ({
        id: post.id,
        job_position: post.job_position,
        location: post.location,
        datePost: post.datePost,
        description: post.description,
        salary: post.salary,
        userId: post.user.id,
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
        location: post.location,
        datePost: post.datePost,
        description: post.description,
        salary: post.salary,
        userId: post.user.id,
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.delete(+id);
  }
}
