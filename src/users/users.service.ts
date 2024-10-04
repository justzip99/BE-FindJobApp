import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Signup } from './dto/request/signup.dto';
import { UpdateUser } from './dto/request/updateUser.dto';
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

  async updateUser(email: string, id: number, updateUserDetails: UpdateUser) {
    let updatedUser = await this.findUserById(id);

    if (!updatedUser) {
      throw new NotFoundException('User not found with provided ID');
    }

    const currentEmail = updatedUser.email;
    const newEmail = updateUserDetails.email;

    if (newEmail && newEmail !== currentEmail) {
      const existingUser = await this.findUserByEmail(newEmail);
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Email already exists');
      }
    }

    let locationUpdate = updatedUser.location;

    if (updateUserDetails.location) {
      const { address, province, district, lat, lng } =
        updateUserDetails.location;
      locationUpdate = {
        address: address ?? updatedUser.location?.address,
        province: province ?? updatedUser.location?.province,
        district: district ?? updatedUser.location?.district,
        lat: lat ?? updatedUser.location?.lat,
        lng: lng ?? updatedUser.location?.lng,
      };
    }

    updatedUser = {
      ...updatedUser,
      ...updateUserDetails,
      location: locationUpdate,
    };
    return this.userRepository.save(updatedUser);
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async deleteUser(id: number) {
    try {
      const deletedUser = await this.findUserById(id);
      if (!deletedUser) {
        throw new NotFoundException('Users not found by the provided ID');
      }
      await this.userRepository.remove(deletedUser);
      return 'User deleted succesfully';
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}

