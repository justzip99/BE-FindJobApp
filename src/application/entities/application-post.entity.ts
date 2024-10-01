import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Application } from './application.entity';

@Entity('application_post')
export class ApplicationPost {
  @PrimaryColumn()
  applicationId: number;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.applicationPosts)
  post: Post;

  @ManyToOne(() => Application, (application) => application.applicationPosts)
  application: Application;
}
