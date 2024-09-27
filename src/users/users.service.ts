import { Injectable, NotFoundException } from '@nestjs/common';
import { Signup } from './dto/request/signup.dto';
import { updateUser } from './dto/request/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  createUser(authuser: Signup): Promise<User> {
    const newUser = this.userRepository.create({ ...authuser });
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateUserDetails: updateUser) {
    let updatedUser = await this.findUserById(id);

    if (!updatedUser) {
      throw new NotFoundException('User not found with provided id');
    }

    updatedUser = { ...updatedUser, ...updateUserDetails };
    return this.userRepository.save(updatedUser);
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
}
