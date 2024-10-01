import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationsService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/custome_decorator/currentUser.decorator';
import { User } from '../users/users.entity';

@Controller('applications')
@UseInterceptors(ClassSerializerInterceptor)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  createApplication(@CurrentUser() currentUser: User) {
    return this.applicationsService.createApplication(currentUser.id);
  }

  @Post(':applicationId/add-apply/:postId')
  @UseGuards(AuthGuard)
  addApplicationToPost(
    @Param('applicationId') applicationId: string,
    @Param('postId') postId: string,
  ) {
    return this.applicationsService.addApplicationToPost(
      +applicationId,
      +postId,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  findApplicationsForUser(@CurrentUser() currentUser: User) {
    return this.applicationsService.findApplicationsForUser(currentUser.id);
  }

  @Delete(':applicationId')
  deleteApplication(@Param('applicationId') applicationId: string) {
    return this.applicationsService.deleteApplication(+applicationId);
  }
}
