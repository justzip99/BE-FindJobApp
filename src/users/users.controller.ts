import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Res, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthenticateUser } from './dto/request/authuser.dto';
import { UsersService } from './users.service';
import { updateUser } from './dto/request/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
@Controller('users')
export class UsersController {  
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) {}

    @Post('register')
    async RegisterUser(@Body(new ValidationPipe) AuthuserDto: AuthenticateUser) {
        AuthuserDto.password = await bcrypt.hash(AuthuserDto.password, 10);
        return this.usersService.createUser(AuthuserDto);
    } 

    @Post('login')
    async LoginUser(@Body() authuserDto: AuthenticateUser,
                    @Res({passthrough: true}) response: Response
) {
        const user = await this.usersService.findOneUser(authuserDto.email);

        if(!user) {
            throw new NotFoundException("User not found");
        }

        if(!await bcrypt.compare(authuserDto.password, user.password)) {
            throw new BadRequestException("Invalid credentials");
        }

        const jwt = await this.jwtService.signAsync({id: user.id, userName: user.userName})

        response.cookie('jwt', jwt, {httpOnly: true})
        return user;

    
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
    getAllUsersDetails(@Req() request: Request) {
        try{
        const cookie = request.cookies['jwt']
        const data = this.jwtService.verify(cookie);
        if(!data) {
            throw new UnauthorizedException("Unauthorized");
        }

        return this.usersService.findUsers();
        } catch {
            throw new UnauthorizedException("Unauthorized");
        }
    }
}



