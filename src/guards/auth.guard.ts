import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
      //take token from header
      const request = context.switchToHttp().getRequest();
      const token = request.header.authoriztion;

      console.log(token)
      if (!token) {
        throw new ForbiddenException('Please provide access token');
      }

      //JWT verify token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log(payload);

      //find user in DB base on JWT verify
     
      return true;
    

  }
}
