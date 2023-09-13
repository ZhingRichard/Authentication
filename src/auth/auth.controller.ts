import { Controller, Post, UseGuards, Request, Get, Body, Req, Res, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { signUpDto } from 'src/dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly userService:UsersService) {}

    @Post('signup')
    async signUsers(@Body()payload: signUpDto){
        return this.userService.signUp(payload)
    }

    @Post('login')
    async login(@Body()payload,  @Req()req, @Res()res) {
      return this.authService.login(payload, req, res)
    }

    
    @Get('logout')
    async signOut(@Req()req, @Res()res){
      return this.userService.signOut(req,res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getProfile() {
      return this.userService.findUser()
    }
}
