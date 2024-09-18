import { AuthenticateUser } from './authuser.dto';
import { PartialType } from '@nestjs/mapped-types';

export class updateUser  {
    userName: string;
    email: string;
    address: string;
}