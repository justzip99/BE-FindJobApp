import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Signup } from './dto/request/signup.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { LoginUser } from './dto/request/loginuser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async register(authuserDto: Signup) {
    //check if email existed
    const userByEmail = await this.userService.findOneUser(authuserDto.email);
    if (userByEmail) {
      throw new BadRequestException('Email already existed!');
    }
    //hash password

    const hashedPassword = await bcrypt.hash(authuserDto.password, 12);

    authuserDto.password = hashedPassword;
    //Save to db
    const savedUser = await this.userService.createUser(authuserDto);

    //generate jwt token
    const payload = {
      id: savedUser.id,
      userName: savedUser.userName,
      email: savedUser.email,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {
      msg: 'User has been created',
      access_token,
    };
  }

  async login(authuserDto: LoginUser) {
    const userByEmail = await this.userService.findOneUser(authuserDto.email);

    if (!userByEmail) {
      throw new BadRequestException('Wrong email or password');
    }

    const isMatchPassword = await bcrypt.compare(
      authuserDto.password,
      userByEmail.password,
    );

    if (!isMatchPassword) {
      throw new BadRequestException('Wrong email or password');
    }

    const payload = {
      id: userByEmail.id,
      email: userByEmail.email,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      msg: 'Login successfully',
      access_token,
    };
  }
}
