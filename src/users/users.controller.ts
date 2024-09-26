import {
  Body,
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
import { updateUser } from './dto/request/updateUser.dto';
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


  @Put(':id')
  @UseGuards(AuthGuard)
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDetails: updateUser,
  ) {
    return this.usersService.updateUser(id, updateUserDetails);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    try {
      return this.usersService.deleteUser(parseInt(id));
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  getUserDetails(@Param('id') id: number) {
    return this.usersService.findUserById(id);
  }
}
