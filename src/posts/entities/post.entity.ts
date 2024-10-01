import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/users.entity';
import { Transform } from 'class-transformer';
import { ApplicationPost } from '../../application/entities/application-post.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  job_position: string;

  @Column({ default: '' })
  location: string;

  @CreateDateColumn()
  datePost: Date;

  @Column({ default: '' })
  description: string;

  @Column({ default: 0 })
  salary: number;

  @OneToMany(() => ApplicationPost, (applicationPost) => applicationPost.post)
  applicationPosts: ApplicationPost[];

  @ManyToOne(() => User, (user) => user.posts)
  @Transform(({ obj }) => obj.user.id)
  user: User;
}
