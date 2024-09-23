import {Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { updateUser } from './dto/request/updateUser.dto';
import { Signup } from './dto/request/signup.dto';
import { LoginUser } from './dto/request/loginuser.dto';
import { AuthService } from './auth.service';
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {  
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    @Post('register')
    async RegistingUser(@Body() AuthuserDto: Signup) {
        return this.authService.register(AuthuserDto);
    } 

    @Post('login')
    async LoginUser(@Body() authuserDto: LoginUser) {
        return this.authService.login(authuserDto);
    }

    @Put(':id')
    updateUserById(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateUserDetails: updateUser) {
        return this.usersService.updateUser(id, updateUserDetails)
     } 

    @Delete(':id')
    deleteUserById(@Param('id') id: string) {
        try {
            return this.usersService.deleteUser(parseInt(id));
        } catch (err) {
            throw new NotFoundException("User not found");
        }
    }    

    @Get()
    getUserDetails( email: string) {
        return this.usersService.findOneUser(email); 
    }
}



