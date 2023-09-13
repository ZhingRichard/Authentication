import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { signUpDto } from 'src/dto/signup.dto';
import { User } from 'src/entity/userEntity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { loginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, 
    private jwtService:JwtService)
    {}

    async signUp(payload:signUpDto):Promise<User>{
        const {firstName, lastName, email, password, gender:gender}=payload;

        const salt = bcrypt.genSaltSync(10);

        const hashPassword = await bcrypt.hashSync(password, salt);

        const user = await this.userRepository.findOne({where:{email:email}});
        if(user){
            throw new HttpException('sorry email already exist', 400);
        }


        const registeredUser = await this.userRepository.save({firstName, lastName, email, gender, password:hashPassword})

        delete registeredUser.password;

        return registeredUser;

    }

    async logUser(login: loginDto, req:Request, res:Response){

        const {email, password}=login

        const user =  await this.userRepository.findOne({where:{email:email}});
        if(!user){
            throw new HttpException('user does\'nt exit', 400)
        }

        if(!await bcrypt.compare(password, (await user).password)){
            throw new HttpException('Wrong password', 400)
        };

        delete (await user).password;

        const token = this.signToken({firstName:user.firstName, email:user.email})

        if(!token){
            throw new UnauthorizedException()
        }

        
         res.cookie('token', token);
            return res.send({
                statusCode: 200,
                message: 'login succesfully',
                token: (await token).accessToken
                
                
            })
            
           
    }
    async signOut( req:Request, res:Response){
        const clearCookies =  res.clearCookie('token');
        const response = res.send({statusCode: 200, message:'logged out successfully'});
        return{
            clearCookies,
            response
        }
    }

    async getUserCredentials({email, password}):Promise<User | undefined>{
        return this.userRepository.findOneBy({email, password})
    }

    async signToken(args:{firstName:string, email:string}){
        const payload = args;
        return {
            accessToken: this.jwtService.sign(payload)
        }

       }

       async findUser(){
        return this.userRepository.find()
       }
}
