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
  Logger,
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

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserDetails(@Param('id') id: number) {
    return this.usersService.findUserById(id);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() currentUser: User) {
     console.log('Current user in controller:', currentUser);
    return currentUser;
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateUserById(
    @Request() request,
    @Body() updateUserDetails: UpdateUser,
  ) {
    const updatedUser = await this.usersService.updateUser(
      request.currentUser.email,
      request.currentUser.id,
      updateUserDetails,
    );

    const { password, ...result } = updatedUser;
    return result;
  }

  @Delete()
  @UseGuards(AuthGuard)
  deleteUserById(@Request() request) {
    return this.usersService.deleteUser(request.currentUser.id);
  }
}
