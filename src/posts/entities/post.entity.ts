import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/users.entity';
import { Transform } from 'class-transformer';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  job_position: string;

  @Column()
  location: string;

  @CreateDateColumn()
  datePost: Date;

  @Column()
  description: string;

  @Column()
  salary: number;

  @ManyToOne(() => User, (user) => user.posts)
  @Transform(({ obj }) => obj.user.id)
  user: User;
}
