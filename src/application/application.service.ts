import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationPost } from './entities/application-post.entity';
import { Application } from './entities/application.entity';
import { transformApplications } from './dto/application-JSON-format.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(ApplicationPost)
    private applicationPostRepository: Repository<ApplicationPost>,
  ) {}

  addApplicationAndApplyToPost(userId: number, postId: number) {
    const newApplication = this.applicationRepository.create({ userId });

    return this.applicationRepository
      .save(newApplication)
      .then((savedApplication) => {
        const newApplicationPost = this.applicationPostRepository.create({
          application: { id: savedApplication.id },
          post: { id: postId },
        });

        return this.applicationPostRepository
          .save(newApplicationPost)
          .then(() => ({
            success: true,
            message: 'Applied to post successfully',
          }))
          .catch(() => ({
            success: false,
            message: 'Failed to apply to post',
          }));
      });
  }

  findApplicationsForUser(userId: number) {
    return this.applicationRepository
      .find({
        where: { userId },
        relations: ['applicationPosts', 'applicationPosts.post'],
      })
      .then((applications) => transformApplications(applications));
  }

  async deleteApplication(applicationId: number): Promise<string> {
    const application = await this.applicationRepository.findOne({
      where: { id: applicationId },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${applicationId} not found`,
      );
    }

    await this.applicationPostRepository.delete({
      application: { id: applicationId },
    });

    await this.applicationRepository.remove(application);

    return 'Application and related entries deleted successfully';
  }
}
