import { Injectable, UseGuards } from '@nestjs/common';
import { AuthenticateUser } from './dto/request/authuser.dto';
import {updateUser } from './dto/request/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
@Injectable()

export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>
) {
    }
        createUser(authuser: AuthenticateUser):Promise<User> {
            const newUser = this.userRepository.create({... authuser});
            return this.userRepository.save(newUser);
    }

    updateUser(id: number, updateUserDetails: updateUser) {
        return this.userRepository.update({id}, {...updateUserDetails})
    }

    async findUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOneUser(email: string): Promise<User> {
        return this.userRepository.findOne({where: {email}});
    }

    deleteUser(id: number) {
        return this.userRepository.delete({id});
    }
}   
