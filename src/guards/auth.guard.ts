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
    try {
      //take token from header
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];

      console.log(token);
      if (!token) {
        throw new ForbiddenException('Please provide access token');
      }

      //JWT verify token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log(payload);

      //find user in DB base on JWT verify
      const user = await this.userService.findUserByEmail(payload.email);
      if (!user) {
        throw new BadRequestException(
          'This user does not belong to the provided token.',
        );
      }

      //Assign user to request object
      request.currentUser = user;
    } catch (error) {
      throw new ForbiddenException('Invalid or expired token');
    }
    return true;
  }
}
