import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/users.entity';
import { ApplicationPost } from './application-post.entity';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.applications)
  user: User;

  @OneToMany(
    () => ApplicationPost,
    (applicationPost) => applicationPost.application,
  )
  applicationPosts: ApplicationPost[];
  application: any;
}
