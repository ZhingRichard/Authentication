import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
    
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserCredentials({email, password})
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user, req:Request, res:Response) {
    return this.usersService.logUser(user,req,res)
  }
}