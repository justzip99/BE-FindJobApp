import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/users.entity';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.applications)
  user: User;

  @OneToMany(
    () => Application,
    (applicationPost) => applicationPost.application,
  )
  applicationPosts: Application[];
  application: any;
}
