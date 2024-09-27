import {
  Body,
  Request,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUser } from './dto/request/updateUser.dto';
import { Signup } from './dto/request/signup.dto';
import { LoginUser } from './dto/request/loginuser.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from './users.entity';
import { CurrentUser } from './custome_decorator/currentUser.decorator';
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async RegistingUser(@Body() AuthuserDto: Signup) {
    return this.authService.register(AuthuserDto);
  }

  @Post('login')
  async LoginUser(@Body() authuserDto: LoginUser) {
    return this.authService.login(authuserDto);
  }

  @Get('current_user')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @Put()
  @UseGuards(AuthGuard)
  updateUserById(@Request() request,email: string ,@Body() updateUserDetails: UpdateUser) {
    return this.usersService.updateUser(
      email,
      request.currentUser.id,
      updateUserDetails,
    );
  }

  @Delete()
  @UseGuards(AuthGuard)
  deleteUserById(@Request() request) {
      return this.usersService.deleteUser(request.currentUser.id);
  }

  @Get()
  @UseGuards(AuthGuard)
  getUserDetails(@Request() request) {
    return this.usersService.findUserById(request.currentUser.id);
  }
}
