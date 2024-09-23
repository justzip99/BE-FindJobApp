import { UsersService } from './users.service';
import { updateUser } from './dto/request/updateUser.dto';
import { Signup } from './dto/request/signup.dto';
import { LoginUser } from './dto/request/loginuser.dto';
import { AuthService } from './auth.service';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    RegistingUser(AuthuserDto: Signup): Promise<{
        msg: string;
        access_token: string;
    }>;
    LoginUser(authuserDto: LoginUser): Promise<{
        msg: string;
        access_token: string;
    }>;
    updateUserById(id: number, updateUserDetails: updateUser): Promise<import("typeorm").UpdateResult>;
    deleteUserById(id: string): Promise<import("typeorm").DeleteResult>;
    getUserDetails(email: string): Promise<import("./users.entity").User>;
}
