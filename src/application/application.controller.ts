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

import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/custome_decorator/currentUser.decorator';
import { User } from '../users/users.entity';

@Controller('applications')
@UseInterceptors(ClassSerializerInterceptor)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('apply-post')
  @UseGuards(AuthGuard)
  async applyToPost(
    @CurrentUser() currentUser: User,
    @Body() body: { postId: number },
  ) {
    const result = await this.applicationsService.addApplicationAndApplyToPost(
      currentUser.id,
      body.postId,
    );
    return result;
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
