import { AuthenticateUser } from './dto/request/authuser.dto';
import { UsersService } from './users.service';
import { updateUser } from './dto/request/updateUser.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    RegisterUser(AuthuserDto: AuthenticateUser): Promise<import("./users.entity").User>;
    LoginUser(authuserDto: AuthenticateUser, response: Response): Promise<import("./users.entity").User>;
    updateUserById(id: number, updateUserDetails: updateUser): Promise<import("typeorm").UpdateResult>;
    deleteUserById(id: string): Promise<import("typeorm").DeleteResult>;
    getAllUsersDetails(request: Request): Promise<import("./users.entity").User[]>;
}
