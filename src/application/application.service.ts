import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationPost } from './entities/application-post.entity';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(ApplicationPost)
    private applicationPostRepository: Repository<ApplicationPost>,
  ) {}

  createApplication(userId: number): Promise<Application> {
    const newApplication = this.applicationRepository.create({ userId });
    return this.applicationRepository.save(newApplication);
  }

  addApplicationToPost(applicationId: number, postId: number) {
    const newApplicationPost = this.applicationPostRepository.create({
      application: { id: applicationId },
      post: { id: postId },
    });

    return this.applicationPostRepository
      .save(newApplicationPost)
      .then((result) => ({
        applicationId: result.applicationId,
        postId: result.postId,
      }));
  }

  findApplicationsForUser(userId: number) {
    return this.applicationRepository.find({
      where: { userId },
      relations: ['applicationPosts', 'applicationPosts.post'],
    });
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
