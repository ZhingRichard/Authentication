/// <reference types="express" />
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { signUpDto } from 'src/dto/signup.dto';
export declare class AuthController {
    private authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    signUsers(payload: signUpDto): Promise<import("../entity/userEntity").User>;
    login(payload: any, req: any, res: any): Promise<import("express").Response<any, Record<string, any>>>;
    signOut(req: any, res: any): Promise<{
        clearCookies: import("express").Response<any, Record<string, any>>;
        response: import("express").Response<any, Record<string, any>>;
    }>;
    getProfile(): Promise<import("../entity/userEntity").User[]>;
}
