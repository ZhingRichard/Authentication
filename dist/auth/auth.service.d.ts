import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
