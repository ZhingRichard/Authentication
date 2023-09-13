import { signUpDto } from 'src/dto/signup.dto';
import { User } from 'src/entity/userEntity';
import { Repository } from 'typeorm';
import { loginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
export declare class UsersService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    signUp(payload: signUpDto): Promise<User>;
    logUser(login: loginDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    signOut(req: Request, res: Response): Promise<{
        clearCookies: Response<any, Record<string, any>>;
        response: Response<any, Record<string, any>>;
    }>;
    getUserCredentials({ email, password }: {
        email: any;
        password: any;
    }): Promise<User | undefined>;
    signToken(args: {
        firstName: string;
        email: string;
    }): Promise<{
        accessToken: string;
    }>;
    findUser(): Promise<User[]>;
}
