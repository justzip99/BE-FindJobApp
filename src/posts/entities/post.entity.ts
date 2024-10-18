import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/users.entity';
import { Expose, Transform } from 'class-transformer';
import { ApplicationPost } from '../../application/entities/application-post.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1000, default: '' })
  job_position: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  requirements: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  qualification: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  experience: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  jobType: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  specialization: string;

  @Column({ type: 'varchar', length: 1000, default: '' })
  description: string;

  @Column({ default: 0 })
  salary: number;

  @Column({ type: 'json', nullable: true })
  location: {
    address: string;
    province: string;
    district: string;
    lat: number;
    lng: number;
  };

  @Column({ type: 'json', nullable: true })
  social: {
    facebook: String;
    phoneNumber: String;
    other: String;
  };

  @CreateDateColumn()
  datePost: Date;

  @Expose()
  get expDatePost(): Date {
    const expDate = new Date(this.datePost);
    expDate.setDate(expDate.getDate() + 30);
    return expDate;
  }

  @OneToMany(() => ApplicationPost, (applicationPost) => applicationPost.post)
  applicationPosts: ApplicationPost[];

  @ManyToOne(() => User, (user) => user.posts)
  @Transform(({ obj }) => obj.user.id)
  user: User;
}
