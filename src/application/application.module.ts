import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationPost } from './entities/application-post.entity';
import { Application } from './entities/application.entity';
import { ApplicationsController } from './application.controller';
import { ApplicationsService } from './application.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application, ApplicationPost, User])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, UsersService],
})
export class ApplicationModule {}
