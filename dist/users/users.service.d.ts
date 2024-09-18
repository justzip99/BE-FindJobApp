import { AuthenticateUser } from './dto/request/authuser.dto';
import { updateUser } from './dto/request/updateUser.dto';
import { Repository } from 'typeorm';
import { User } from './users.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(authuser: AuthenticateUser): Promise<User>;
    updateUser(id: number, updateUserDetails: updateUser): Promise<import("typeorm").UpdateResult>;
    findUsers(): Promise<User[]>;
    findOneUser(email: string): Promise<User>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
