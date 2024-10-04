import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];

      if (!token) {
        throw new ForbiddenException('Please provide access token');
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userService.findUserByEmail(payload.email);
      if (!user) {
        throw new BadRequestException(
          'This user does not belong to the provided token.',
        );
      }

      request.currentUser = user;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    return true;
  }
}
