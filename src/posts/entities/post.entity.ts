import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/users.entity';
import { Transform } from 'class-transformer';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @Column()
  location: string;

  @CreateDateColumn()
  datePost: Date;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.posts)
  @Transform(({obj}) => obj.user.id)
  user: User;
}
