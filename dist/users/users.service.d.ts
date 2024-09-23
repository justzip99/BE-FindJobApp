import { Signup } from './dto/request/signup.dto';
import { updateUser } from './dto/request/updateUser.dto';
import { Repository } from 'typeorm';
import { User } from './users.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(authuser: Signup): Promise<User>;
    updateUser(id: number, updateUserDetails: updateUser): Promise<import("typeorm").UpdateResult>;
    findOneUser(email: string): Promise<User>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
