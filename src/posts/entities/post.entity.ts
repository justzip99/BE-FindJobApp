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

  @Column({ default: "" })
  job_position: string;

  @Column({default: ""})
  location: string;

  @CreateDateColumn()
  datePost: Date;

  @Column({default: ""})
  description: string;

  @Column({default: 0})
  salary: number;

  @ManyToOne(() => User, (user) => user.posts)
  @Transform(({ obj }) => obj.user.id)
  user: User;
}
